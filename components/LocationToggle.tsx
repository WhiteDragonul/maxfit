import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Type, Radius, Shadow } from '@/constants/theme';
import { LISTA_LOCATII } from '@/constants/data';
import { useLocatie } from '@/context/Location';

// Segmented control pentru alegerea locației (Coșbuc / 21). Selecția e globală și persistată.
export default function LocationToggle() {
  const { locatieId, setLocatie } = useLocatie();

  return (
    <View style={styles.wrap}>
      {LISTA_LOCATII.map((l) => {
        const activ = l.id === locatieId;
        return (
          <TouchableOpacity
            key={l.id}
            style={[styles.btn, activ && styles.btnActive]}
            onPress={() => setLocatie(l.id)}
            activeOpacity={0.85}
          >
            <Text style={[styles.txt, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
              {l.nume}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.pill,
    padding: 4,
    gap: 4,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActive: { backgroundColor: Colors.primary, ...Shadow.button },
  txt: { ...Type.label, letterSpacing: 0 },
});
