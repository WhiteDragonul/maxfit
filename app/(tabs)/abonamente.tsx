import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import TopBar from '@/components/TopBar';
import LocationToggle from '@/components/LocationToggle';
import { Colors, Spacing, Type, Radius, Shadow } from '@/constants/theme';
import {
  ABONAMENTE,
  NOTA_ABONAMENTE,
  PRETURI_CLASE,
  COLOANE_CLASE,
  OFERTA_CLASE,
  SOLAR,
  PERSONAL_TRAINER,
  COLOANE_PT,
  NOTA_PT,
  PRETURI_FITNESS,
  COLOANE_FITNESS,
  NOTA_FITNESS,
  PretClasa,
  Abonament,
} from '@/constants/data';
import { useLocatie } from '@/context/Location';
import { useMembership, TipPret } from '@/context/Membership';

const LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const formatData = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${LUNI[m - 1]} ${y}`;
};

const CATEGORII = ['Abonamente', 'Clase', 'Fitness', 'Personal Trainer'] as const;
type Categorie = (typeof CATEGORII)[number];

// Tabel de prețuri reutilizabil (scroll orizontal ca să nu se înghesuie coloanele).
function PriceTable({ coloane, randuri }: { coloane: string[]; randuri: PretClasa[] }) {
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header */}
          <View style={[styles.tRow, styles.tHeaderRow]}>
            <View style={styles.tLeft} />
            {coloane.map((c) => (
              <Text key={c} style={[styles.tCell, styles.tHeaderCell]}>
                {c}
              </Text>
            ))}
          </View>
          {randuri.map((r, idx) => (
            <View key={r.clasa} style={[styles.tRow, idx % 2 === 1 && styles.tRowAlt]}>
              <Text style={[styles.tLeft, styles.tLeftText]} numberOfLines={2}>
                {r.clasa}
              </Text>
              {r.preturi.map((p, i) => (
                <Text key={i} style={[styles.tCell, p == null && styles.tCellEmpty]}>
                  {p == null ? '–' : `${p} lei`}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Card>
  );
}

export default function Abonamente() {
  const insets = useSafeAreaInsets();
  const [cat, setCat] = useState<Categorie>('Abonamente');
  const { locatie } = useLocatie();
  const { abonament, cumpara } = useMembership();

  const [tip, setTip] = useState<TipPret>('normal');
  const [checkout, setCheckout] = useState<Abonament | null>(null);
  const [platit, setPlatit] = useState(false);

  const pretFor = (a: Abonament) => (tip === 'normal' ? a.normal : a.student);

  const finalizeaza = () => {
    if (!checkout) return;
    cumpara({
      id: checkout.id,
      nume: checkout.nume,
      durata: checkout.durata,
      luni: checkout.luni,
      tip,
      pret: pretFor(checkout),
    });
    setPlatit(true);
  };

  const inchideCheckout = () => {
    setCheckout(null);
    setPlatit(false);
  };

  return (
    <View style={styles.container}>
      <TopBar title="Max Fitness Galați" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.pageTitle}>Tarife</Text>
          <Text style={styles.pageSubtitle}>Alege ce ți se potrivește. Prețuri valabile până la 31.12.2026.</Text>
        </View>

        {/* Categorii */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Spacing.sm }}>
          {CATEGORII.map((c) => {
            const activ = c === cat;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.catChip, activ ? styles.catChipActive : styles.catChipIdle]}
                onPress={() => setCat(c)}
                activeOpacity={0.85}
              >
                <Text style={[styles.catChipText, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>{c}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Abonamente fitness ── */}
        {cat === 'Abonamente' && (
          <View style={{ gap: Spacing.lg }}>
            {/* Comutator preț */}
            <View style={styles.segment}>
              {(['normal', 'student'] as TipPret[]).map((t) => {
                const activ = t === tip;
                return (
                  <TouchableOpacity key={t} style={[styles.segBtn, activ && styles.segBtnActive]} onPress={() => setTip(t)} activeOpacity={0.85}>
                    <Text style={[styles.segText, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
                      {t === 'normal' ? 'Normal' : 'Elev / Student'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {ABONAMENTE.map((a) => {
              const activ = abonament?.id === a.id;
              const lunar = tip === 'normal' ? a.normalLunar : a.studentLunar;
              return (
                <Card key={a.id} padding={Spacing.lg} radius={20} bordered={a.popular} borderColor={Colors.primary} style={a.popular ? { borderWidth: 2 } : undefined}>
                  {a.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularBadgeText}>CEL MAI POPULAR</Text>
                    </View>
                  )}
                  <Text style={styles.abDurata}>{a.durata}</Text>
                  <Text style={styles.abNume}>{a.nume}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>{pretFor(a)} RON</Text>
                    <Text style={styles.priceUnit}>{lunar} lei/lună</Text>
                  </View>
                  <View style={styles.freezeRow}>
                    <View style={styles.dot} />
                    <Text style={styles.freezeText}>Freeze 2 săptămâni inclus</Text>
                  </View>
                  {activ ? (
                    <View style={styles.activBtn}>
                      <MaterialIcons name="check-circle" size={18} color={Colors.primary} />
                      <Text style={styles.activBtnText}>Abonament activ</Text>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.cumparaBtn} activeOpacity={0.85} onPress={() => setCheckout(a)}>
                      <Text style={styles.cumparaBtnText}>Cumpără {a.nume}</Text>
                    </TouchableOpacity>
                  )}
                </Card>
              );
            })}
            <Text style={styles.nota}>{NOTA_ABONAMENTE}</Text>
          </View>
        )}

        {/* ── Prețuri clase (pe locație) ── */}
        {cat === 'Clase' && (
          <View style={{ gap: Spacing.gap }}>
            <LocationToggle />
            <PriceTable coloane={COLOANE_CLASE} randuri={PRETURI_CLASE[locatie.id]} />
            <Card padding={Spacing.lg} bordered borderColor={Colors.primary}>
              <Text style={styles.oferLabel}>OFERTĂ ALL-INCLUSIVE</Text>
              <Text style={styles.oferText}>{OFERTA_CLASE[locatie.id].text}</Text>
              <Text style={styles.oferPret}>{OFERTA_CLASE[locatie.id].pret} lei</Text>
            </Card>
            {locatie.id === 'cosbuc' && (
              <PriceTable coloane={['Preț']} randuri={SOLAR.map((s) => ({ clasa: `Solar · ${s.durata}`, preturi: [s.pret] }))} />
            )}
            <Text style={styles.nota}>Durata unei ședințe: 50 min. Pentru 7Card, Sanopass, ESX se achită o coplată de 15 lei/ședință.</Text>
          </View>
        )}

        {/* ── Fitness ── */}
        {cat === 'Fitness' && (
          <View style={{ gap: Spacing.gap }}>
            <PriceTable coloane={COLOANE_FITNESS} randuri={PRETURI_FITNESS} />
            <Text style={styles.nota}>{NOTA_FITNESS}</Text>
          </View>
        )}

        {/* ── Personal Trainer ── */}
        {cat === 'Personal Trainer' && (
          <View style={{ gap: Spacing.gap }}>
            <PriceTable coloane={COLOANE_PT} randuri={PERSONAL_TRAINER} />
            <Text style={styles.nota}>{NOTA_PT}</Text>
          </View>
        )}
      </ScrollView>

      {/* Checkout / plată */}
      <Modal visible={checkout !== null} transparent animationType="slide" onRequestClose={inchideCheckout}>
        <Pressable style={styles.dimmer} onPress={inchideCheckout} />
        <View style={styles.sheetWrap}>
          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 16 }]}>
            <View style={styles.grabber} />
            {platit ? (
              <>
                <View style={styles.successIcon}>
                  <MaterialIcons name="check" size={32} color={Colors.onPrimary} />
                </View>
                <Text style={styles.sheetTitle}>Plată reușită!</Text>
                <Text style={styles.sheetText}>
                  Abonamentul {checkout?.nume} e activ. Vezi data de expirare în secțiunea Profil.
                </Text>
                <TouchableOpacity style={styles.payBtn} activeOpacity={0.85} onPress={inchideCheckout}>
                  <Text style={styles.payBtnText}>Gata</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.sheetTitle}>Finalizează plata</Text>
                <Text style={styles.sheetText}>Plată online securizată — nu mai e nevoie să plătești la sală.</Text>
                <View style={styles.summary}>
                  <View style={styles.sumRow}>
                    <Text style={styles.sumLabel}>Abonament</Text>
                    <Text style={styles.sumVal}>{checkout?.nume} · {checkout?.durata}</Text>
                  </View>
                  <View style={styles.sumDivider} />
                  <View style={styles.sumRow}>
                    <Text style={styles.sumLabel}>Tarif</Text>
                    <Text style={styles.sumVal}>{tip === 'normal' ? 'Normal' : 'Elev / Student'}</Text>
                  </View>
                  <View style={styles.sumDivider} />
                  <View style={styles.sumRow}>
                    <Text style={styles.sumTotalLabel}>Total</Text>
                    <Text style={styles.sumTotal}>{checkout ? pretFor(checkout) : 0} RON</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.payBtn} activeOpacity={0.85} onPress={finalizeaza}>
                  <MaterialIcons name="lock" size={18} color={Colors.onPrimary} />
                  <Text style={styles.payBtnText}>Plătește {checkout ? pretFor(checkout) : 0} RON</Text>
                </TouchableOpacity>
                <Text style={styles.demoNote}>Plată simulată (demo) — nu se efectuează o tranzacție reală.</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const COL_W = 82;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.gap,
    paddingBottom: 120,
    gap: Spacing.lg,
  },
  pageTitle: { ...Type.display, color: Colors.onSurface, textAlign: 'center' },
  pageSubtitle: { ...Type.bodySm, color: Colors.onSurfaceVariant, textAlign: 'center', marginTop: Spacing.sm, maxWidth: 320 },

  catChip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: Radius.pill },
  catChipActive: { backgroundColor: Colors.primary, ...Shadow.button },
  catChipIdle: { backgroundColor: Colors.surfaceAlt },
  catChipText: { ...Type.label, letterSpacing: 0 },

  // Abonamente cards
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    ...Shadow.button,
  },
  popularBadgeText: { ...Type.label, color: Colors.onPrimary },
  abDurata: { ...Type.label, color: Colors.primary, marginTop: 4 },
  abNume: { ...Type.headlineMd, color: Colors.onSurface, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 8 },
  price: { ...Type.stat, color: Colors.primary },
  priceUnit: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginBottom: 4 },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.chip,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: Spacing.gap,
  },
  studentLabel: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  studentVal: { ...Type.bodyMdSemi, color: Colors.onSurface },
  studentSub: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  freezeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary },
  freezeText: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  nota: { ...Type.bodySm, color: Colors.onSurfaceVariant, lineHeight: 18 },

  // Oferta
  oferLabel: { ...Type.label, color: Colors.primary },
  oferText: { ...Type.bodyMdSemi, color: Colors.onSurface, marginTop: 6 },
  oferPret: { ...Type.headlineMd, color: Colors.primary, marginTop: 8 },

  // Table
  tRow: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.border },
  tHeaderRow: { backgroundColor: Colors.surfaceAlt, borderBottomColor: Colors.border },
  tRowAlt: { backgroundColor: '#fbfbfc' },
  tLeft: { width: 140, paddingHorizontal: 12, paddingVertical: 14 },
  tLeftText: { ...Type.bodySm, fontFamily: 'Inter_600SemiBold', color: Colors.onSurface },
  tCell: { width: COL_W, textAlign: 'center', paddingVertical: 14, ...Type.bodySm, color: Colors.onSurface },
  tHeaderCell: { ...Type.label, color: Colors.onSurfaceVariant, letterSpacing: 0 },
  tCellEmpty: { color: Colors.outline },

  // Toggle preț Normal/Student
  segment: { flexDirection: 'row', backgroundColor: Colors.surfaceAlt, borderRadius: Radius.pill, padding: 4, gap: 4 },
  segBtn: { flex: 1, paddingVertical: 10, borderRadius: Radius.pill, alignItems: 'center' },
  segBtnActive: { backgroundColor: Colors.primary, ...Shadow.button },
  segText: { ...Type.label, letterSpacing: 0 },

  // Butoane card abonament
  cumparaBtn: { marginTop: Spacing.gap, backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: Radius.button, alignItems: 'center', ...Shadow.button },
  cumparaBtnText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  activBtn: {
    marginTop: Spacing.gap,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 13,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryTint,
  },
  activBtnText: { ...Type.bodyMdSemi, color: Colors.primary },

  // Checkout modal
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
  sheetText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', marginBottom: Spacing.lg, maxWidth: 320 },
  summary: { width: '100%', backgroundColor: Colors.surfaceAlt, borderRadius: Radius.card, padding: Spacing.gap, gap: Spacing.sm, marginBottom: Spacing.lg },
  sumRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sumLabel: { ...Type.bodySm, color: Colors.onSurfaceVariant },
  sumVal: { ...Type.bodyMdSemi, color: Colors.onSurface },
  sumDivider: { height: StyleSheet.hairlineWidth, backgroundColor: Colors.border },
  sumTotalLabel: { ...Type.bodyMdSemi, color: Colors.onSurface },
  sumTotal: { ...Type.headlineMd, fontSize: 20, color: Colors.primary },
  payBtn: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.button,
  },
  payBtnText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  demoNote: { ...Type.bodySm, color: Colors.onSurfaceVariant, textAlign: 'center', marginTop: 12 },
});
