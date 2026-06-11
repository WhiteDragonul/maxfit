import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { CLASE } from '@/constants/data';

const ZILE = ['Toate', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];

export default function Clase() {
  const [ziSelectata, setZiSelectata] = useState('Toate');
  const [rezervari, setRezervari] = useState<string[]>([]);

  const claseFiltrate = ziSelectata === 'Toate' ? CLASE : CLASE.filter((c) => c.zi === ziSelectata);

  const rezerva = (id: string, nume: string) => {
    if (rezervari.includes(id)) {
      setRezervari(rezervari.filter((r) => r !== id));
    } else {
      setRezervari([...rezervari, id]);
      Alert.alert('Rezervare confirmată ✅', `Te-ai înscris la ${nume}. Te așteptăm!`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtre}
        contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: Spacing.sm }}
      >
        {ZILE.map((zi) => (
          <TouchableOpacity
            key={zi}
            style={[styles.chip, ziSelectata === zi && styles.chipActiv]}
            onPress={() => setZiSelectata(zi)}
          >
            <Text style={[styles.chipText, ziSelectata === zi && styles.chipTextActiv]}>{zi}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={claseFiltrate}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.md, gap: Spacing.md }}
        renderItem={({ item }) => {
          const rezervat = rezervari.includes(item.id);
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name={item.icon as any} size={26} color={Colors.primary} />
                <View style={{ flex: 1, marginLeft: Spacing.md }}>
                  <Text style={styles.nume}>{item.nume}</Text>
                  <Text style={styles.detalii}>
                    {item.zi} · {item.ora} · {item.durata} min
                  </Text>
                  <Text style={styles.detalii}>Antrenor: {item.antrenor}</Text>
                </View>
                <View style={styles.locuri}>
                  <Text style={styles.locuriNr}>{item.locuriDisponibile}</Text>
                  <Text style={styles.locuriLabel}>locuri</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.buton, rezervat && styles.butonRezervat]}
                onPress={() => rezerva(item.id, item.nume)}
              >
                <Text style={styles.butonText}>{rezervat ? 'Anulează rezervarea' : 'Rezervă un loc'}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  filtre: { flexGrow: 0, paddingVertical: Spacing.sm },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActiv: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { color: Colors.textSecondary, fontWeight: '600' },
  chipTextActiv: { color: Colors.text },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  nume: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  detalii: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  locuri: { alignItems: 'center' },
  locuriNr: { color: Colors.primary, fontSize: 20, fontWeight: '800' },
  locuriLabel: { color: Colors.textSecondary, fontSize: 11 },
  buton: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  butonRezervat: { backgroundColor: Colors.surfaceLight },
  butonText: { color: Colors.text, fontWeight: '700' },
});
