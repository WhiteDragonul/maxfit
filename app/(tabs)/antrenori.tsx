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
import { Colors, Spacing, Type, Radius, Shadow } from '@/constants/theme';
import { ANTRENORI, Antrenor } from '@/constants/data';

const FILTRE = ['Toate', 'Forță', 'Cardio', 'Funcțional', 'Dans'];

const initiale = (nume: string) =>
  nume
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function Antrenori() {
  const insets = useSafeAreaInsets();
  const [filtru, setFiltru] = useState('Toate');
  const [programat, setProgramat] = useState<Antrenor | null>(null);

  const lista = useMemo(
    () => (filtru === 'Toate' ? ANTRENORI : ANTRENORI.filter((a) => a.taguri.includes(filtru))),
    [filtru],
  );

  return (
    <View style={styles.container}>
      <TopBar title="Max Fitness Galați" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.pageTitle}>Antrenori</Text>
          <Text style={styles.pageSubtitle}>
            Alege antrenorul potrivit pentru obiectivele tale și programează o ședință.
          </Text>
        </View>

        {/* Filtre */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: Spacing.sm }}
        >
          {FILTRE.map((f) => {
            const activ = f === filtru;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.filterChip, activ ? styles.filterChipActive : styles.filterChipIdle]}
                onPress={() => setFiltru(f)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista antrenori */}
        <View style={{ gap: Spacing.gap }}>
          {lista.length === 0 && (
            <Text style={styles.empty}>Niciun antrenor pentru acest filtru.</Text>
          )}
          {lista.map((a) => (
            <Card key={a.id} padding={Spacing.lg}>
              <View style={styles.head}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{initiale(a.nume)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{a.nume}</Text>
                  <Text style={styles.spec}>{a.specializare}</Text>
                  <View style={styles.expRow}>
                    <MaterialIcons name="military-tech" size={15} color={Colors.primary} />
                    <Text style={styles.expText}>{a.experienta}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.desc}>{a.descriere}</Text>

              <View style={styles.tags}>
                {a.taguri.map((t) => (
                  <View key={t} style={styles.tag}>
                    <Text style={styles.tagText}>{t}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.85} onPress={() => setProgramat(a)}>
                <MaterialIcons name="calendar-month" size={18} color={Colors.onPrimary} />
                <Text style={styles.btnPrimaryText}>Programează o ședință</Text>
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Confirmare programare */}
      <Modal visible={programat !== null} transparent animationType="slide" onRequestClose={() => setProgramat(null)}>
        <Pressable style={styles.dimmer} onPress={() => setProgramat(null)} />
        <View style={styles.sheetWrap}>
          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 16 }]}>
            <View style={styles.grabber} />
            <View style={styles.successIcon}>
              <MaterialIcons name="check" size={32} color={Colors.onPrimary} />
            </View>
            <Text style={styles.sheetTitle}>Cerere trimisă!</Text>
            <Text style={styles.sheetText}>
              {programat?.nume} te va contacta în curând pentru a stabili ora ședinței de antrenament personal.
            </Text>
            <TouchableOpacity style={[styles.btnPrimary, { width: '100%' }]} activeOpacity={0.85} onPress={() => setProgramat(null)}>
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
  empty: { ...Type.bodyMd, color: Colors.onSurfaceVariant, textAlign: 'center', paddingVertical: 32 },

  filterChip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: Radius.pill },
  filterChipActive: { backgroundColor: Colors.primary, ...Shadow.button },
  filterChipIdle: { backgroundColor: Colors.surfaceAlt },
  filterChipText: { ...Type.label, letterSpacing: 0 },

  head: { flexDirection: 'row', gap: Spacing.gap, alignItems: 'center', marginBottom: Spacing.gap },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...Type.headlineMd, fontSize: 20, color: Colors.primary },
  name: { ...Type.bodyLgSemi, color: Colors.onSurface },
  spec: { ...Type.bodySm, color: Colors.onSurfaceVariant, marginTop: 1 },
  expRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  expText: { ...Type.label, color: Colors.primary, letterSpacing: 0 },
  desc: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginBottom: Spacing.gap },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.gap },
  tag: { backgroundColor: Colors.surfaceAlt, paddingHorizontal: 10, paddingVertical: 5, borderRadius: Radius.pill },
  tagText: { ...Type.label, color: Colors.onSurfaceVariant, letterSpacing: 0 },

  btnPrimary: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.button,
  },
  btnPrimaryText: { ...Type.bodyMdSemi, color: Colors.onPrimary },

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
});
