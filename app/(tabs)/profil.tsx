import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { CONTACT } from '@/constants/data';

// Date demo — vor fi înlocuite când conectăm aplicația la un backend cu conturi reale.
const MEMBRU = {
  nume: 'Membru MaxFit',
  abonament: 'Full Access',
  valabilPana: '11 iulie 2026',
  vizteLunaAceasta: 9,
};

export default function Profil() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={Colors.text} />
        </View>
        <Text style={styles.nume}>{MEMBRU.nume}</Text>
        <View style={styles.badgeAbonament}>
          <Ionicons name="card" size={14} color={Colors.primary} />
          <Text style={styles.badgeText}>{MEMBRU.abonament}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNr}>{MEMBRU.vizteLunaAceasta}</Text>
          <Text style={styles.statLabel}>vizite luna aceasta</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNr}>{MEMBRU.valabilPana}</Text>
          <Text style={styles.statLabel}>abonament valabil până la</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Check-in la sală</Text>
        <Text style={styles.cardText}>
          Prezintă acest cod la recepție pentru acces rapid.
        </Text>
        <View style={styles.qrPlaceholder}>
          <Ionicons name="qr-code" size={120} color={Colors.text} />
          <Text style={styles.qrText}>ID membru: MF-2026-0001</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actiune} onPress={() => Linking.openURL(CONTACT.site)}>
        <Ionicons name="globe" size={20} color={Colors.primary} />
        <Text style={styles.actiuneText}>maxfit.ro</Text>
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actiune}
        onPress={() => Linking.openURL(`tel:${CONTACT.telefon.replace(/\s/g, '')}`)}
      >
        <Ionicons name="call" size={20} color={Colors.primary} />
        <Text style={styles.actiuneText}>Sună la recepție</Text>
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actiune}
        onPress={() => Linking.openURL(`mailto:${CONTACT.email}`)}
      >
        <Ionicons name="mail" size={20} color={Colors.primary} />
        <Text style={styles.actiuneText}>Trimite-ne un email</Text>
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  nume: { color: Colors.text, fontSize: 18, fontWeight: '700' },
  badgeAbonament: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    marginTop: Spacing.sm,
  },
  badgeText: { color: Colors.text, fontSize: 12, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: Spacing.md },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNr: { color: Colors.primary, fontSize: 18, fontWeight: '800', textAlign: 'center' },
  statLabel: { color: Colors.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 4 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  cardText: { color: Colors.textSecondary, fontSize: 13, marginTop: 4 },
  qrPlaceholder: { alignItems: 'center', paddingVertical: Spacing.lg },
  qrText: { color: Colors.textSecondary, fontSize: 13, marginTop: Spacing.sm },
  actiune: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actiuneText: { color: Colors.text, fontSize: 15, flex: 1 },
});
