import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Card from '@/components/Card';
import TopBar from '@/components/TopBar';
import { Colors, Spacing, Type, Radius, Shadow } from '@/constants/theme';
import { ORAR } from '@/constants/data';
import { useLocatie } from '@/context/Location';

export default function Acasa() {
  const router = useRouter();
  const { locatie } = useLocatie();

  const weekday = (new Date().getDay() + 6) % 7;
  const claseAzi = (ORAR[locatie.id][weekday] ?? []).slice(0, 4);
  const oreGym = locatie.programFitness[0].ore;

  return (
    <View style={styles.container}>
      <TopBar name="Alexandru" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero / Promo */}
        <Card padding={Spacing.lg} radius={20}>
          <View style={styles.heroLabel}>
            <Text style={styles.heroLabelText}>RECOMANDARE</Text>
          </View>
          <Text style={styles.heroTitle}>HIIT Class</Text>
          <Text style={styles.heroText}>
            Antrenament de intensitate crescută pentru rezultate maxime în timp minim.
            Alătură-te provocării de azi.
          </Text>
          <TouchableOpacity style={styles.heroBtn} activeOpacity={0.85} onPress={() => router.push('/clase')}>
            <Text style={styles.heroBtnText}>Vezi detalii</Text>
          </TouchableOpacity>
        </Card>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Card style={{ flex: 1 }} padding={Spacing.gap}>
            <View style={styles.statHead}>
              <MaterialIcons name="calendar-month" size={20} color={Colors.onSurfaceVariant} />
              <Text style={styles.statLabel}>Vizite luna aceasta</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
          </Card>
          <Card style={{ flex: 1 }} padding={Spacing.gap}>
            <View style={styles.statHead}>
              <MaterialIcons name="schedule" size={20} color={Colors.onSurfaceVariant} />
              <Text style={styles.statLabel}>Ore de Gym</Text>
            </View>
            <Text style={styles.statHours}>{oreGym}</Text>
          </Card>
        </View>

        {/* Clasele de azi */}
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clasele de azi</Text>
            <TouchableOpacity onPress={() => router.push('/clase')}>
              <Text style={styles.sectionLink}>Toate</Text>
            </TouchableOpacity>
          </View>
          {claseAzi.length === 0 ? (
            <Text style={styles.empty}>Azi nu sunt clase de grup programate.</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: Spacing.gap, paddingRight: Spacing.screen }}
            >
              {claseAzi.map((clasa) => (
                <Card key={clasa.id} style={styles.classCard} padding={Spacing.gap} radius={Radius.card}>
                  <View style={styles.classTop}>
                    <View style={styles.timePill}>
                      <MaterialIcons name="schedule" size={14} color={Colors.primary} />
                      <Text style={styles.timePillText}>{clasa.ora}</Text>
                    </View>
                    <View style={styles.categoryChip}>
                      <Text style={styles.categoryChipText}>{clasa.categorie}</Text>
                    </View>
                  </View>
                  <Text style={styles.classCardTitle}>{clasa.nume}</Text>
                  <View style={styles.instructorRow}>
                    <MaterialIcons name="schedule" size={16} color={Colors.onSurfaceVariant} />
                    <Text style={styles.instructorText}>{clasa.durata}</Text>
                  </View>
                </Card>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.lg,
    paddingBottom: 120,
    gap: Spacing.section,
  },
  heroLabel: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: Spacing.sm,
  },
  heroLabelText: { ...Type.label, color: Colors.primary },
  heroTitle: { ...Type.headlineLg, color: Colors.onSurface, marginBottom: Spacing.sm },
  heroText: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginBottom: Spacing.lg, maxWidth: '90%' },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: Radius.button,
    ...Shadow.button,
  },
  heroBtnText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  statsRow: { flexDirection: 'row', gap: Spacing.gap },
  statHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.gap },
  statLabel: { ...Type.bodySm, color: Colors.onSurfaceVariant, flex: 1 },
  statValue: { ...Type.stat, color: Colors.primary },
  statHours: { ...Type.headlineMd, fontSize: 22, color: Colors.onSurface },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.gap,
  },
  sectionTitle: { ...Type.headlineMd, fontSize: 22, color: Colors.onSurface },
  sectionLink: { ...Type.bodySm, fontFamily: 'Inter_600SemiBold', color: Colors.primary },
  empty: { ...Type.bodyMd, color: Colors.onSurfaceVariant },
  classCard: { width: 240 },
  classTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  timePillText: { ...Type.label, color: Colors.primary, letterSpacing: 0 },
  categoryChip: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryChipText: { ...Type.label, color: Colors.onSurfaceVariant, letterSpacing: 0 },
  classCardTitle: { ...Type.bodyLgSemi, color: Colors.onSurface, marginBottom: 4 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  instructorText: { ...Type.bodySm, color: Colors.onSurfaceVariant },
});
