import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { Colors, Spacing, Type, Radius } from '@/constants/theme';
import { GYM, LOCATIE_PRINCIPALA } from '@/constants/data';
import { useReservations } from '@/context/Reservations';

const telLink = (t: string) => `tel:${t.replace(/\s/g, '')}`;

const ACTIUNI = [
  { id: 'istoric', label: 'Istoric', icon: 'history' as const },
  { id: 'plati', label: 'Plăți', icon: 'payments' as const },
  { id: 'setari', label: 'Setări', icon: 'settings' as const },
  { id: 'suport', label: 'Suport', icon: 'support-agent' as const },
];

export default function Profil() {
  const insets = useSafeAreaInsets();
  const { rezervari, cancel } = useReservations();
  const receptie = LOCATIE_PRINCIPALA;

  const azi = new Date().toISOString().slice(0, 10);
  const viitoare = [...rezervari]
    .filter((r) => r.dataISO >= azi)
    .sort((a, b) => (a.dataISO + a.ora).localeCompare(b.dataISO + b.ora));

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
            <Text style={styles.premiumChipText}>MEMBRU PREMIUM</Text>
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
              <Text style={styles.memberStatValue}>Activ</Text>
            </View>
          </View>
        </Card>

        {/* QR */}
        <Card padding={Spacing.lg} style={{ alignItems: 'center' }}>
          <Text style={styles.qrTitle}>Cod Acces Sala</Text>
          <View style={styles.qrFrame}>
            <MaterialIcons name="qr-code-2" size={150} color={Colors.white} />
          </View>
          <TouchableOpacity style={styles.refreshBtn} activeOpacity={0.8}>
            <MaterialIcons name="refresh" size={20} color={Colors.onSurface} />
            <Text style={styles.refreshBtnText}>Reîncarcă Codul</Text>
          </TouchableOpacity>
        </Card>

        {/* Rezervările mele */}
        <View>
          <Text style={styles.sectionTitle}>Rezervările mele</Text>
          {viitoare.length === 0 ? (
            <Card padding={Spacing.lg}>
              <View style={styles.emptyRez}>
                <MaterialIcons name="event-available" size={28} color={Colors.onSurfaceVariant} />
                <Text style={styles.emptyRezText}>
                  Nu ai nicio rezervare. Rezervă-ți locul din secțiunea Clase.
                </Text>
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
                        {r.dataLabel} • {r.sala} • Instructor: {r.instructor}
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
            <TouchableOpacity style={styles.footerLink} activeOpacity={0.7} onPress={() => Linking.openURL(telLink(receptie.telefon))}>
              <MaterialIcons name="call" size={18} color={Colors.onSurface} />
              <Text style={styles.footerLinkText}>{receptie.telefon}</Text>
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
  content: {
    paddingHorizontal: Spacing.screen,
    paddingBottom: 120,
    gap: Spacing.section,
  },
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
  premiumChip: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    marginBottom: Spacing.sm,
  },
  premiumChipText: { ...Type.label, color: Colors.onSurfaceVariant },
  memberName: { ...Type.headlineMd, color: Colors.onSurface, marginBottom: Spacing.gap },
  memberStats: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  memberStat: { alignItems: 'center' },
  memberStatLabel: { ...Type.label, color: Colors.onSurfaceVariant, marginBottom: 4 },
  memberStatValue: { ...Type.stat, fontSize: 26, color: Colors.primary },
  memberStatDivider: { width: StyleSheet.hairlineWidth, height: 40, backgroundColor: Colors.border },
  qrTitle: { ...Type.bodyLg, color: Colors.onSurface, marginBottom: Spacing.gap },
  qrFrame: {
    backgroundColor: Colors.onSurface,
    padding: 16,
    borderRadius: Radius.card,
    marginBottom: Spacing.gap,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: Radius.button,
  },
  refreshBtnText: { ...Type.bodySm, fontFamily: 'Inter_600SemiBold', color: Colors.onSurface },
  sectionTitle: { ...Type.headlineLg, color: Colors.onSurface, marginBottom: Spacing.gap },
  emptyRez: { alignItems: 'center', gap: 12 },
  emptyRezText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', maxWidth: 260 },
  rezRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.gap },
  rezTime: {
    backgroundColor: Colors.primaryTint,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: Radius.chip,
    minWidth: 60,
    alignItems: 'center',
  },
  rezTimeText: { ...Type.label, color: Colors.primary, letterSpacing: 0 },
  rezName: { ...Type.bodyMdSemi, color: Colors.onSurface },
  rezMeta: { ...Type.bodySm, color: Colors.onSurfaceVariant, marginTop: 2 },
  rezCancel: { padding: 6 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  actionCard: {
    width: '47.8%',
    flexGrow: 1,
    aspectRatio: 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionLabel: { ...Type.bodySm, color: Colors.onSurface },
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  footerTitle: { ...Type.bodySm, color: Colors.onSurfaceVariant, marginBottom: Spacing.gap },
  footerLinks: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: Spacing.lg },
  footerLink: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerLinkText: { ...Type.bodySm, color: Colors.onSurface },
});
