import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { ABONAMENTE, CONTACT } from '@/constants/data';

export default function Abonamente() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}>
      {ABONAMENTE.map((ab) => (
        <View key={ab.id} style={[styles.card, ab.popular && styles.cardPopular]}>
          {ab.popular && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>CEL MAI POPULAR</Text>
            </View>
          )}
          <Text style={styles.nume}>{ab.nume}</Text>
          <View style={styles.pretRow}>
            <Text style={styles.pret}>{ab.pret}</Text>
            <Text style={styles.pretLuna}> lei / lună</Text>
          </View>
          <View style={styles.beneficii}>
            {ab.beneficii.map((b) => (
              <View key={b} style={styles.beneficiu}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                <Text style={styles.beneficiuText}>{b}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.buton, ab.popular && styles.butonPopular]}
            onPress={() => Linking.openURL(`tel:${CONTACT.telefon.replace(/\s/g, '')}`)}
          >
            <Text style={styles.butonText}>Sună pentru abonare</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.nota}>
        Abonamentele se pot achiziționa direct la recepția sălii din Galați. Studenții și elevii
        beneficiază de reducere cu carnetul vizat.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardPopular: { borderColor: Colors.primary, borderWidth: 2 },
  badge: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    marginBottom: Spacing.sm,
  },
  badgeText: { color: Colors.text, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  nume: { color: Colors.text, fontSize: 20, fontWeight: '800' },
  pretRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: Spacing.xs },
  pret: { color: Colors.primary, fontSize: 32, fontWeight: '900' },
  pretLuna: { color: Colors.textSecondary, fontSize: 14 },
  beneficii: { marginTop: Spacing.md, gap: Spacing.sm },
  beneficiu: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  beneficiuText: { color: Colors.text, fontSize: 14, flex: 1 },
  buton: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.md - 4,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  butonPopular: { backgroundColor: Colors.primary },
  butonText: { color: Colors.text, fontWeight: '700' },
  nota: { color: Colors.textSecondary, fontSize: 13, textAlign: 'center', paddingBottom: Spacing.lg },
});
