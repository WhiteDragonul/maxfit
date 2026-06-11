import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { PROGRAM_SALA, CLASE, CONTACT } from '@/constants/data';

const AZI = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'][new Date().getDay()];

export default function Acasa() {
  const router = useRouter();
  const claseAzi = CLASE.filter((c) => c.zi === AZI);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.md }}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Bine ai venit la MaxFit! 💪</Text>
        <Text style={styles.heroSubtitle}>Sala ta de fitness din Galați</Text>
        <TouchableOpacity style={styles.heroButton} onPress={() => router.push('/abonamente')}>
          <Text style={styles.heroButtonText}>Vezi abonamentele</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Clasele de azi ({AZI})</Text>
      {claseAzi.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.cardText}>Nu sunt clase programate azi. Sala te așteaptă oricând! 🏋️</Text>
        </View>
      ) : (
        claseAzi.map((clasa) => (
          <View key={clasa.id} style={[styles.card, styles.rowCard]}>
            <Ionicons name={clasa.icon as any} size={24} color={Colors.primary} />
            <View style={{ flex: 1, marginLeft: Spacing.md }}>
              <Text style={styles.cardTitle}>{clasa.nume}</Text>
              <Text style={styles.cardText}>
                {clasa.ora} · {clasa.durata} min · {clasa.antrenor}
              </Text>
            </View>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Program sală</Text>
      <View style={styles.card}>
        {PROGRAM_SALA.map((p) => (
          <View key={p.zile} style={styles.programRow}>
            <Text style={styles.cardTitle}>{p.zile}</Text>
            <Text style={styles.programOre}>{p.ore}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Contact</Text>
      <View style={styles.card}>
        <View style={styles.contactRow}>
          <Ionicons name="location" size={18} color={Colors.primary} />
          <Text style={styles.cardText}>{CONTACT.adresa}</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="call" size={18} color={Colors.primary} />
          <Text style={styles.cardText}>{CONTACT.telefon}</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="mail" size={18} color={Colors.primary} />
          <Text style={styles.cardText}>{CONTACT.email}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  heroTitle: { color: Colors.text, fontSize: 24, fontWeight: '800' },
  heroSubtitle: { color: '#FFD9C7', fontSize: 15, marginTop: Spacing.xs },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    marginTop: Spacing.md,
  },
  heroButtonText: { color: Colors.text, fontWeight: '600' },
  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowCard: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: Colors.text, fontSize: 15, fontWeight: '600' },
  cardText: { color: Colors.textSecondary, fontSize: 14, marginTop: 2 },
  programRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  programOre: { color: Colors.primary, fontWeight: '600' },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
});
