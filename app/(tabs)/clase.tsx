import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import TopBar from '@/components/TopBar';
import LocationToggle from '@/components/LocationToggle';
import { Colors, Spacing, Type, Radius, Shadow } from '@/constants/theme';
import { ORAR } from '@/constants/data';
import { useReservations, Rezervare } from '@/context/Reservations';
import { useLocatie } from '@/context/Location';

const ZILE_SCURT = ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ']; // index = Date.getDay()
const LUNI_SCURT = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'];

interface Zi {
  dataISO: string;
  scurt: string;
  data: number;
  weekday: number; // 0 = Luni ... 6 = Duminică
  label: string;
  esteAzi: boolean;
}

export default function Clase() {
  const insets = useSafeAreaInsets();
  const [ziSelectata, setZiSelectata] = useState(0);
  const [confirmare, setConfirmare] = useState<Rezervare | null>(null);
  const { isReserved, reserve, cancel } = useReservations();
  const { locatie } = useLocatie();

  const ZILE = useMemo<Zi[]>(() => {
    const azi = new Date();
    azi.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(azi);
      d.setDate(azi.getDate() + i);
      return {
        dataISO: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        scurt: ZILE_SCURT[d.getDay()],
        data: d.getDate(),
        weekday: (d.getDay() + 6) % 7,
        label: `${ZILE_SCURT[d.getDay()]}, ${d.getDate()} ${LUNI_SCURT[d.getMonth()]}`,
        esteAzi: i === 0,
      };
    });
  }, []);

  const zi = ZILE[ziSelectata];
  const claseZi = ORAR[locatie.id][zi.weekday] ?? [];

  return (
    <View style={styles.container}>
      <TopBar title="Max Fitness Galați" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.pageTitle}>Clase</Text>
          <Text style={styles.pageSubtitle}>Rezervă-ți locul la clasele preferate.</Text>
        </View>

        <LocationToggle />

        {/* Selector zile */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: Spacing.sm }}
        >
          {ZILE.map((z, i) => {
            const activ = i === ziSelectata;
            return (
              <TouchableOpacity
                key={z.dataISO}
                style={[styles.dayChip, activ ? styles.dayChipActive : styles.dayChipIdle]}
                onPress={() => setZiSelectata(i)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayChipLabel, { color: activ ? Colors.onPrimary : Colors.onSurface }]}>
                  {z.scurt}
                </Text>
                <Text style={[styles.dayChipDate, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
                  {z.data}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista de clase */}
        <View style={{ gap: Spacing.gap }}>
          {claseZi.length === 0 && (
            <Card padding={Spacing.lg}>
              <View style={styles.emptyBox}>
                <MaterialIcons name="self-improvement" size={28} color={Colors.onSurfaceVariant} />
                <Text style={styles.empty}>
                  În această zi nu sunt clase de grup la {locatie.nume} — doar acces fitness.
                </Text>
              </View>
            </Card>
          )}
          {claseZi.map((clasa) => {
            const key = `${locatie.id}-${zi.dataISO}-${clasa.id}`;
            const rezervat = isReserved(key);
            const locuriRamase = clasa.capacitate - clasa.ocupate - (rezervat ? 1 : 0);
            const ocupat = !rezervat && locuriRamase <= 0;

            const onRezerva = () => {
              const rez: Rezervare = {
                key,
                classId: clasa.id,
                nume: clasa.nume,
                categorie: clasa.categorie,
                ora: clasa.ora,
                durata: clasa.durata,
                locatieId: locatie.id,
                locatieNume: locatie.nume,
                dataISO: zi.dataISO,
                dataLabel: zi.esteAzi ? 'Azi' : zi.label,
              };
              reserve(rez);
              setConfirmare(rez);
            };

            return (
              <Card key={clasa.id} padding={Spacing.gap} bordered={rezervat} borderColor={Colors.outlineVariant}>
                {rezervat && <View style={styles.accentStripe} />}
                <View style={styles.classRow}>
                  <View style={styles.timeBox}>
                    <Text style={[styles.timeBoxHour, { color: rezervat || ocupat ? Colors.onSurface : Colors.primary }]}>
                      {clasa.ora}
                    </Text>
                    <Text style={styles.timeBoxDur}>50 MIN</Text>
                  </View>
                  <View style={{ flex: 1, gap: 6 }}>
                    <View style={styles.titleRow}>
                      <Text style={styles.className}>{clasa.nume}</Text>
                      {rezervat ? (
                        <View style={[styles.pill, styles.pillReserved]}>
                          <MaterialIcons name="check-circle" size={13} color={Colors.onSurfaceVariant} />
                          <Text style={styles.pillReservedText}>Rezervat</Text>
                        </View>
                      ) : ocupat ? (
                        <View style={[styles.pill, styles.pillFull]}>
                          <Text style={styles.pillFullText}>Ocupat</Text>
                        </View>
                      ) : (
                        <View style={[styles.pill, styles.pillSpots]}>
                          <Text style={styles.pillSpotsText}>{locuriRamase} locuri</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.categoryChip}>
                      <Text style={styles.categoryChipText}>{clasa.categorie}</Text>
                    </View>
                  </View>
                </View>

                {rezervat ? (
                  <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8} onPress={() => cancel(key)}>
                    <Text style={styles.btnOutlineText}>Anulează</Text>
                  </TouchableOpacity>
                ) : ocupat ? (
                  <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8}>
                    <Text style={styles.btnOutlineText}>Listă așteptare</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={onRezerva}>
                    <Text style={styles.btnPrimaryText}>Rezervă un loc</Text>
                  </TouchableOpacity>
                )}
              </Card>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom sheet confirmare */}
      <Modal visible={confirmare !== null} transparent animationType="slide" onRequestClose={() => setConfirmare(null)}>
        <Pressable style={styles.dimmer} onPress={() => setConfirmare(null)} />
        <View style={styles.sheetWrap}>
          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 16 }]}>
            <View style={styles.grabber} />
            <View style={styles.successIcon}>
              <MaterialIcons name="check" size={32} color={Colors.onPrimary} />
            </View>
            <Text style={styles.sheetTitle}>Rezervare Confirmată!</Text>
            <Text style={styles.sheetText}>
              Te-ai înscris la {confirmare?.nume} de la {confirmare?.ora}, {confirmare?.locatieNume}. Te așteptăm!
            </Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Dată</Text>
                <Text style={styles.detailsValue}>{confirmare?.dataLabel}</Text>
              </View>
              <View style={styles.detailsDivider} />
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Locație</Text>
                <Text style={styles.detailsValue}>{confirmare?.locatieNume}</Text>
              </View>
              <View style={styles.detailsDivider} />
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Oră</Text>
                <Text style={styles.detailsValue}>{confirmare?.ora}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.btnPrimary, { width: '100%' }]} activeOpacity={0.85} onPress={() => setConfirmare(null)}>
              <Text style={styles.btnPrimaryText}>Gata</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.gap,
    paddingBottom: 120,
    gap: Spacing.lg,
  },
  pageTitle: { ...Type.display, color: Colors.onSurface, marginBottom: 4 },
  pageSubtitle: { ...Type.bodyMd, color: Colors.onSurfaceVariant },
  emptyBox: { alignItems: 'center', gap: 12 },
  empty: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', maxWidth: 280 },

  dayChip: {
    minWidth: 52,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.button,
    alignItems: 'center',
    gap: 2,
  },
  dayChipActive: { backgroundColor: Colors.primary, ...Shadow.button },
  dayChipIdle: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.outlineVariant },
  dayChipLabel: { ...Type.label, letterSpacing: 0 },
  dayChipDate: { ...Type.bodySm, fontFamily: 'Inter_600SemiBold' },

  accentStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: Colors.primary,
    opacity: 0.5,
    borderTopLeftRadius: Radius.card,
    borderBottomLeftRadius: Radius.card,
  },
  classRow: { flexDirection: 'row', gap: Spacing.gap, alignItems: 'flex-start' },
  timeBox: {
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.surface,
    borderRadius: Radius.button,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeBoxHour: { ...Type.headlineMd, fontSize: 20 },
  timeBoxDur: { ...Type.label, color: Colors.onSurfaceVariant, letterSpacing: 0.4, marginTop: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  className: { ...Type.bodyLgSemi, color: Colors.onSurface },
  categoryChip: { alignSelf: 'flex-start', backgroundColor: Colors.surfaceAlt, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  categoryChipText: { ...Type.label, color: Colors.onSurfaceVariant, letterSpacing: 0 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill },
  pillSpots: { backgroundColor: Colors.primarySoft },
  pillSpotsText: { ...Type.label, color: Colors.onPrimarySoft, letterSpacing: 0 },
  pillReserved: { backgroundColor: Colors.surfaceHigh },
  pillReservedText: { ...Type.label, color: Colors.onSurfaceVariant, letterSpacing: 0 },
  pillFull: { backgroundColor: '#fdeceb' },
  pillFullText: { ...Type.label, color: Colors.error, letterSpacing: 0 },

  btnPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.button,
    alignItems: 'center',
    marginTop: Spacing.gap,
    ...Shadow.button,
  },
  btnPrimaryText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  btnOutline: {
    paddingVertical: 13,
    borderRadius: Radius.button,
    alignItems: 'center',
    marginTop: Spacing.gap,
    borderWidth: 1.5,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surface,
  },
  btnOutlineText: { ...Type.bodyMdSemi, color: Colors.onSurfaceVariant },

  dimmer: { flex: 1, backgroundColor: 'rgba(26,28,29,0.4)' },
  sheetWrap: { justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.sheet,
    borderTopRightRadius: Radius.sheet,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.gap,
    alignItems: 'center',
    boxShadow: '0px -8px 24px rgba(0,0,0,0.12)',
    elevation: 16,
  },
  grabber: { width: 48, height: 5, borderRadius: 3, backgroundColor: Colors.border, marginBottom: Spacing.lg },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.gap,
    ...Shadow.button,
  },
  sheetTitle: { ...Type.headlineLg, color: Colors.onSurface, textAlign: 'center', marginBottom: 4 },
  sheetText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: Spacing.lg },
  detailsCard: {
    width: '100%',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.card,
    padding: Spacing.gap,
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailsLabel: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  detailsValue: { ...Type.bodyMdSemi, color: Colors.onSurface },
  detailsDivider: { height: StyleSheet.hairlineWidth, backgroundColor: Colors.border },
});
