import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Blobs from '@/components/Blobs';
import GlassCard from '@/components/GlassCard';
import TopBar from '@/components/TopBar';
import { Colors, Spacing, Type, Glass } from '@/constants/theme';

const CLASE_AZI = [
  { id: '1', nume: 'CrossFit Elite', ora: '18:00', instructor: 'Alex', accent: Colors.primary },
  { id: '2', nume: 'Zumba Flow', ora: '19:30', instructor: 'Maria', accent: Colors.tertiary },
];

export default function Acasa() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Blobs />
      <TopBar subtitle="Paun" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.containerMargin,
          paddingTop: 24,
          paddingBottom: 128,
          gap: Spacing.sectionSpacing,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Glowing Promo Banner */}
        <GlassCard radius={32} gradient={Glass.gradientPromo} padding={Spacing.glassInnerPadding}>
          <Text style={styles.promoLabel}>NOU & EXCLUSIV</Text>
          <Text style={styles.promoTitle}>HIIT Class</Text>
          <Text style={styles.promoText}>Începe ziua cu energie pură. Rezervă-ți locul acum.</Text>
          <TouchableOpacity style={styles.promoCta} onPress={() => router.push('/clase')}>
            <Text style={styles.promoCtaText}>Vezi detalii</Text>
            <MaterialIcons name="arrow-forward" size={18} color={Colors.primaryFixed} />
          </TouchableOpacity>
        </GlassCard>

        {/* Quick Stats Bento Grid */}
        <View style={styles.statsRow}>
          <GlassCard style={{ flex: 1 }} padding={Spacing.elementPadding}>
            <View style={styles.statInner}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(241,90,35,0.1)' }]}>
                <MaterialIcons name="calendar-month" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.statLabel}>Vizite luna aceasta</Text>
              <Text style={[styles.statValue, { color: Colors.primaryFixed }]}>12</Text>
            </View>
          </GlassCard>
          <GlassCard style={{ flex: 1 }} padding={Spacing.elementPadding}>
            <View style={styles.statInner}>
              <View style={[styles.statIcon, { backgroundColor: 'rgba(255,182,146,0.1)' }]}>
                <MaterialIcons name="schedule" size={24} color={Colors.tertiary} />
              </View>
              <Text style={styles.statLabel}>Ore de Gym</Text>
              <Text style={[styles.statValueSm, { color: Colors.tertiaryFixed }]}>06:00 - 23:00</Text>
            </View>
          </GlassCard>
        </View>

        {/* Today's Classes Carousel */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clasele de azi</Text>
            <TouchableOpacity onPress={() => router.push('/clase')}>
              <Text style={styles.sectionLink}>Vezi toate</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingRight: Spacing.containerMargin }}
          >
            {CLASE_AZI.map((clasa) => (
              <GlassCard key={clasa.id} radius={28} style={styles.classCard} padding={16}>
                <View style={styles.classCardInner}>
                  <View style={styles.classCardTop}>
                    <View style={[styles.timeBadge, { backgroundColor: `${clasa.accent}33` }]}>
                      <Text style={[styles.timeBadgeText, { color: Colors.primaryFixed }]}>
                        {clasa.ora}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.bookmark}>
                      <MaterialIcons name="bookmark-border" size={18} color={Colors.onSurfaceVariant} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 64 }}>
                    <Text style={styles.classCardTitle}>{clasa.nume}</Text>
                    <View style={styles.instructorRow}>
                      <MaterialIcons name="person" size={14} color={Colors.outline} />
                      <Text style={styles.instructorText}>Instructor: {clasa.instructor}</Text>
                    </View>
                  </View>
                </View>
              </GlassCard>
            ))}
          </ScrollView>
        </View>

        {/* Brand anchor */}
        <View style={styles.brandAnchor}>
          <Text style={styles.brandText}>MAXFIT</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  promoLabel: {
    ...Type.labelBold,
    color: Colors.tertiary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  promoTitle: { ...Type.displayLgMobile, color: Colors.onSurface, marginTop: 8 },
  promoText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginTop: 8, maxWidth: '80%' },
  promoCta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  promoCtaText: { ...Type.labelBold, color: Colors.primaryFixed },
  statsRow: { flexDirection: 'row', gap: Spacing.stackGap },
  statInner: { alignItems: 'center', gap: 8, paddingVertical: 8 },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: { ...Type.labelSm, color: Colors.onSurfaceVariant, textAlign: 'center' },
  statValue: { ...Type.headlineMd, marginTop: 4 },
  statValueSm: { ...Type.headlineSm, marginTop: 4, textAlign: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: { ...Type.headlineSm, color: Colors.onSurface },
  sectionLink: { ...Type.labelBold, color: Colors.primary },
  classCard: { width: 240 },
  classCardInner: { minHeight: 140 },
  classCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  timeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  timeBadgeText: { fontFamily: 'Inter_700Bold', fontSize: 10, textTransform: 'uppercase' },
  bookmark: {
    backgroundColor: 'rgba(18,18,18,0.4)',
    borderRadius: 999,
    padding: 4,
  },
  classCardTitle: { ...Type.headlineSm, color: Colors.white },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  instructorText: { ...Type.labelSm, color: Colors.outline },
  brandAnchor: { alignItems: 'center', paddingVertical: 32, opacity: 0.2 },
  brandText: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 24,
    letterSpacing: 6,
    color: Colors.onSurface,
  },
});
