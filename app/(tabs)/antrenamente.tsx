import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { ANTRENAMENTE } from '@/constants/data';

export default function Antrenamente() {
  const [deschis, setDeschis] = useState<string | null>(ANTRENAMENTE[0].id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}>
      <Text style={styles.intro}>Planuri de antrenament recomandate de antrenorii MaxFit.</Text>
      {ANTRENAMENTE.map((plan) => {
        const esteDeschis = deschis === plan.id;
        return (
          <View key={plan.id} style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => setDeschis(esteDeschis ? null : plan.id)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.nume}>{plan.nume}</Text>
                <Text style={styles.grupe}>{plan.grupe}</Text>
              </View>
              <Ionicons
                name={esteDeschis ? 'chevron-up' : 'chevron-down'}
                size={22}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
            {esteDeschis && (
              <View style={styles.exercitii}>
                {plan.exercitii.map((ex) => (
                  <View key={ex.nume} style={styles.exercitiu}>
                    <Text style={styles.exNume}>{ex.nume}</Text>
                    <Text style={styles.exSeturi}>{ex.seturi}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  intro: { color: Colors.textSecondary, fontSize: 14 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  nume: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  grupe: { color: Colors.primary, fontSize: 13, marginTop: 2 },
  exercitii: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  exercitiu: { flexDirection: 'row', justifyContent: 'space-between' },
  exNume: { color: Colors.text, fontSize: 14, flex: 1 },
  exSeturi: { color: Colors.textSecondary, fontSize: 14, fontWeight: '600' },
});
