import { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '@/components/Card';
import { Colors, Spacing, Type, Radius } from '@/constants/theme';
import { GYM } from '@/constants/data';
import { useReservations } from '@/context/Reservations';
import { useLocatie } from '@/context/Location';
import { useMembership } from '@/context/Membership';

const telLink = (t: string) => `tel:${t.replace(/\s/g, '')}`;
const CHECKIN_KEY = 'maxfit:checkin:v1';

const LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const formatData = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${LUNI[m - 1]} ${y}`;
};
const zileRamase = (iso: string) => {
  const azi = new Date();
  azi.setHours(0, 0, 0, 0);
  const exp = new Date(iso);
  return Math.ceil((exp.getTime() - azi.getTime()) / 86400000);
};

interface Checkin {
  dataISO: string;
  locatieNume: string;
  ora: string;
}

const ACTIUNI = [
  { id: 'istoric', label: 'Istoric', icon: 'history' as const },
  { id: 'plati', label: 'Plăți', icon: 'payments' as const },
  { id: 'setari', label: 'Setări', icon: 'settings' as const },
  { id: 'suport', label: 'Suport', icon: 'support-agent' as const },
];

export default function Profil() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { rezervari, cancel } = useReservations();
  const { locatie } = useLocatie();
  const { abonament } = useMembership();

  const zile = abonament ? zileRamase(abonament.expiryISO) : 0;
  const activ = !!abonament && zile > 0;
  const totalZile = abonament ? Math.max(1, Math.round(abonament.luni * 30.44)) : 1;
  const progres = abonament ? Math.min(1, Math.max(0, (totalZile - zile) / totalZile)) : 0;

  const azi = new Date().toISOString().slice(0, 10);
  const viitoare = [...rezervari]
    .filter((r) => r.dataISO >= azi)
    .sort((a, b) => (a.dataISO + a.ora).localeCompare(b.dataISO + b.ora));

  // Check-in (o singură intrare pe zi, valabilă în ambele locații)
  const [checkin, setCheckin] = useState<Checkin | null>(null);
  useEffect(() => {
    AsyncStorage.getItem(CHECKIN_KEY)
      .then((raw) => raw && setCheckin(JSON.parse(raw)))
      .catch(() => {});
  }, []);

  const intratAzi = checkin?.dataISO === azi;

  const faCheckin = () => {
    if (intratAzi) return;
    const acum = new Date();
    const c: Checkin = {
      dataISO: azi,
      locatieNume: locatie.nume,
      ora: `${String(acum.getHours()).padStart(2, '0')}:${String(acum.getMinutes()).padStart(2, '0')}`,
    };
    setCheckin(c);
    AsyncStorage.setItem(CHECKIN_KEY, JSON.stringify(c)).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialIcons name="settings" size={24} color={Colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card membru */}
        <Card padding={Spacing.lg} style={{ alignItems: 'center' }}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={44} color={Colors.onSurfaceVariant} />
            </View>
            <View style={styles.avatarBadge}>
              <MaterialIcons name="star" size={14} color={Colors.onPrimary} />
            </View>
          </View>
          <View style={styles.premiumChip}>
            <Text style={styles.premiumChipText}>{activ ? `MEMBRU ${abonament!.nume.toUpperCase()}` : 'FĂRĂ ABONAMENT'}</Text>
          </View>
          <Text style={styles.memberName}>Alexandru Paun</Text>
          <View style={styles.memberStats}>
            <View style={styles.memberStat}>
              <Text style={styles.memberStatLabel}>ANTRENAMENTE</Text>
              <Text style={styles.memberStatValue}>124</Text>
            </View>
            <View style={styles.memberStatDivider} />
            <View style={styles.memberStat}>
              <Text style={styles.memberStatLabel}>STATUS</Text>
              <Text style={[styles.memberStatValue, !activ && { color: Colors.onSurfaceVariant }]}>
                {activ ? 'Activ' : 'Inactiv'}
              </Text>
            </View>
          </View>
        </Card>

        {/* Abonamentul meu */}
        {activ ? (
          <Card padding={Spacing.lg}>
            <View style={styles.abHead}>
              <View>
                <Text style={styles.abLabel}>ABONAMENTUL MEU</Text>
                <Text style={styles.abNume}>{abonament!.nume} · {abonament!.durata}</Text>
              </View>
              <View style={styles.abZilePill}>
                <Text style={styles.abZileNr}>{zile}</Text>
                <Text style={styles.abZileText}>zile</Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.round(progres * 100)}%` }]} />
            </View>
            <View style={styles.abFooter}>
              <MaterialIcons name="event" size={16} color={Colors.onSurfaceVariant} />
              <Text style={styles.abExpiry}>Valabil până la {formatData(abonament!.expiryISO)}</Text>
            </View>
          </Card>
        ) : (
          <Card padding={Spacing.lg}>
            <View style={styles.abEmpty}>
              <MaterialIcons name="card-membership" size={28} color={Colors.onSurfaceVariant} />
              <Text style={styles.abEmptyText}>
                {abonament ? 'Abonamentul tău a expirat.' : 'Nu ai un abonament activ.'}
              </Text>
              <TouchableOpacity style={styles.abEmptyBtn} activeOpacity={0.85} onPress={() => router.push('/abonamente')}>
                <Text style={styles.abEmptyBtnText}>Vezi abonamentele</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}

        {/* QR + check-in */}
        <Card padding={Spacing.lg} style={{ alignItems: 'center' }}>
          <Text style={styles.qrTitle}>Cod Acces Sala</Text>
          <Text style={styles.qrSub}>Scanează la aparatul de la intrare — valabil în ambele locații.</Text>
          <View style={styles.qrFrame}>
            <MaterialIcons name="qr-code-2" size={150} color={Colors.white} />
          </View>

          {intratAzi ? (
            <View style={styles.checkinDone}>
              <MaterialIcons name="check-circle" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.checkinDoneTitle}>Ai intrat azi · {checkin?.ora}</Text>
                <Text style={styles.checkinDoneSub}>{checkin?.locatieNume} · o singură intrare pe zi</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.checkinBtn} activeOpacity={0.85} onPress={faCheckin}>
              <MaterialIcons name="qr-code-scanner" size={20} color={Colors.onPrimary} />
              <Text style={styles.checkinBtnText}>Check-in la {locatie.nume}</Text>
            </TouchableOpacity>
          )}
        </Card>

        {/* Rezervările mele */}
        <View>
          <Text style={styles.sectionTitle}>Rezervările mele</Text>
          {viitoare.length === 0 ? (
            <Card padding={Spacing.lg}>
              <View style={styles.emptyRez}>
                <MaterialIcons name="event-available" size={28} color={Colors.onSurfaceVariant} />
                <Text style={styles.emptyRezText}>Nu ai nicio rezervare. Rezervă-ți locul din secțiunea Clase.</Text>
              </View>
            </Card>
          ) : (
            <View style={{ gap: Spacing.sm }}>
              {viitoare.map((r) => (
                <Card key={r.key} padding={Spacing.gap}>
                  <View style={styles.rezRow}>
                    <View style={styles.rezTime}>
                      <Text style={styles.rezTimeText}>{r.ora}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rezName}>{r.nume}</Text>
                      <Text style={styles.rezMeta}>
                        {r.dataLabel} • {r.locatieNume} • {r.categorie}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.rezCancel} activeOpacity={0.7} onPress={() => cancel(r.key)}>
                      <MaterialIcons name="close" size={20} color={Colors.onSurfaceVariant} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>

        {/* Acțiuni rapide */}
        <View>
          <Text style={styles.sectionTitle}>Acțiuni Rapide</Text>
          <View style={styles.actionsGrid}>
            {ACTIUNI.map((a) => (
              <Card key={a.id} padding={Spacing.gap} style={styles.actionCard}>
                <MaterialIcons name={a.icon} size={30} color={Colors.onSurfaceVariant} />
                <Text style={styles.actionLabel}>{a.label}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Contact */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Ai nevoie de ajutor?</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity style={styles.footerLink} activeOpacity={0.7} onPress={() => Linking.openURL(telLink(locatie.telefon))}>
              <MaterialIcons name="call" size={18} color={Colors.onSurface} />
              <Text style={styles.footerLinkText}>{locatie.telefon}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerLink} activeOpacity={0.7} onPress={() => Linking.openURL(`mailto:${GYM.email}`)}>
              <MaterialIcons name="mail" size={18} color={Colors.onSurface} />
              <Text style={styles.footerLinkText}>{GYM.email}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingBottom: Spacing.gap,
    backgroundColor: Colors.background,
  },
  headerTitle: { ...Type.display, color: Colors.onSurface },
  content: { paddingHorizontal: Spacing.screen, paddingBottom: 120, gap: Spacing.section },
  avatarWrap: { position: 'relative', marginBottom: Spacing.gap },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  premiumChip: { backgroundColor: Colors.surfaceAlt, paddingHorizontal: 12, paddingVertical: 5, borderRadius: Radius.pill, marginBottom: Spacing.sm },
  premiumChipText: { ...Type.label, color: Colors.onSurfaceVariant },
  memberName: { ...Type.headlineMd, color: Colors.onSurface, marginBottom: Spacing.gap },
  memberStats: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  memberStat: { alignItems: 'center' },
  memberStatLabel: { ...Type.label, color: Colors.onSurfaceVariant, marginBottom: 4 },
  memberStatValue: { ...Type.stat, fontSize: 26, color: Colors.primary },
  memberStatDivider: { width: StyleSheet.hairlineWidth, height: 40, backgroundColor: Colors.border },

  abHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.gap },
  abLabel: { ...Type.label, color: Colors.primary },
  abNume: { ...Type.headlineMd, fontSize: 20, color: Colors.onSurface, marginTop: 4 },
  abZilePill: { backgroundColor: Colors.primaryTint, borderRadius: Radius.chip, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  abZileNr: { ...Type.headlineMd, fontSize: 20, color: Colors.primary },
  abZileText: { ...Type.label, color: Colors.primary, letterSpacing: 0 },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: Colors.surfaceAlt, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4, backgroundColor: Colors.primary },
  abFooter: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  abExpiry: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  abEmpty: { alignItems: 'center', gap: 12 },
  abEmptyText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center' },
  abEmptyBtn: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: Radius.button, marginTop: 4 },
  abEmptyBtnText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  qrTitle: { ...Type.bodyLg, color: Colors.onSurface },
  qrSub: { ...Type.bodySm, color: Colors.onSurfaceVariant, textAlign: 'center', marginTop: 4, marginBottom: Spacing.gap, maxWidth: 260 },
  qrFrame: { backgroundColor: Colors.onSurface, padding: 16, borderRadius: Radius.card, marginBottom: Spacing.gap },
  checkinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: Radius.button,
  },
  checkinBtnText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  checkinDone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.primaryTint,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radius.button,
  },
  checkinDoneTitle: { ...Type.bodyMdSemi, color: Colors.primary },
  checkinDoneSub: { ...Type.bodySm, color: Colors.onSurfaceVariant, marginTop: 1 },

  sectionTitle: { ...Type.headlineLg, color: Colors.onSurface, marginBottom: Spacing.gap },
  emptyRez: { alignItems: 'center', gap: 12 },
  emptyRezText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', maxWidth: 260 },
  rezRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gap },
  rezTime: { backgroundColor: Colors.primaryTint, paddingHorizontal: 12, paddingVertical: 10, borderRadius: Radius.chip, minWidth: 60, alignItems: 'center' },
  rezTimeText: { ...Type.label, color: Colors.primary, letterSpacing: 0 },
  rezName: { ...Type.bodyMdSemi, color: Colors.onSurface },
  rezMeta: { ...Type.bodySm, color: Colors.onSurfaceVariant, marginTop: 2 },
  rezCancel: { padding: 6 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  actionCard: { width: '47.8%', flexGrow: 1, aspectRatio: 1.6, alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionLabel: { ...Type.bodySm, color: Colors.onSurface },
  footer: { alignItems: 'center', paddingTop: Spacing.lg, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.border },
  footerTitle: { ...Type.bodySm, color: Colors.onSurfaceVariant, marginBottom: Spacing.gap },
  footerLinks: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: Spacing.lg },
  footerLink: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerLinkText: { ...Type.bodySm, color: Colors.onSurface },
});
