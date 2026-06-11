import { useState } from 'react';
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
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Blobs from '@/components/Blobs';
import GlassCard from '@/components/GlassCard';
import TopBar from '@/components/TopBar';
import { Colors, Spacing, Type } from '@/constants/theme';

const ZILE = [
  { scurt: 'Lu', data: 12 },
  { scurt: 'Ma', data: 13 },
  { scurt: 'Mi', data: 14 },
  { scurt: 'Jo', data: 15 },
  { scurt: 'Vi', data: 16 },
  { scurt: 'Sa', data: 17 },
  { scurt: 'Du', data: 18 },
];

interface Clasa {
  id: string;
  nume: string;
  ora: string;
  durata: string;
  instructor: string;
  locuri: number | null; // null = ocupat
  participanti: string;
}

const CLASE: Clasa[] = [
  { id: '1', nume: 'Spinning Intense', ora: '18:00', durata: '50 min', instructor: 'Alexandru M.', locuri: 12, participanti: '+9' },
  { id: '2', nume: 'CrossFit WOD', ora: '19:00', durata: '60 min', instructor: 'Mihai T.', locuri: 3, participanti: '+12' },
  { id: '3', nume: 'Pilates Flow', ora: '20:15', durata: '45 min', instructor: 'Elena D.', locuri: null, participanti: '15/15' },
];

export default function Clase() {
  const insets = useSafeAreaInsets();
  const [ziSelectata, setZiSelectata] = useState(0);
  const [confirmare, setConfirmare] = useState<Clasa | null>(null);

  return (
    <View style={styles.container}>
      <Blobs />
      <TopBar />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.containerMargin,
          paddingTop: 16,
          paddingBottom: 128,
          gap: Spacing.sectionSpacing,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.pageTitle}>Clase</Text>
          <Text style={styles.pageSubtitle}>Rezervă-ți locul la clasele preferate.</Text>
        </View>

        {/* Day Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingBottom: 8 }}
        >
          {ZILE.map((zi, i) => {
            const activ = i === ziSelectata;
            return (
              <TouchableOpacity
                key={zi.scurt}
                style={[styles.dayChip, activ ? styles.dayChipActive : styles.dayChipGlass]}
                onPress={() => setZiSelectata(i)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayChipLabel, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
                  {zi.scurt.toUpperCase()}
                </Text>
                <Text style={[styles.dayChipDate, { color: activ ? Colors.onPrimary : Colors.onSurfaceVariant }]}>
                  {zi.data}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Class List */}
        <View style={{ gap: 16 }}>
          {CLASE.map((clasa) => {
            const ocupat = clasa.locuri === null;
            return (
              <GlassCard
                key={clasa.id}
                radius={12}
                padding={Spacing.glassInnerPadding}
                style={ocupat ? { opacity: 0.7 } : undefined}
              >
                <View style={styles.classTop}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.timeRow}>
                      <Text style={[styles.classTime, { color: ocupat ? Colors.onSurfaceVariant : Colors.primary }]}>
                        {clasa.ora}
                      </Text>
                      <View style={styles.timeDot} />
                      <Text style={styles.classDuration}>{clasa.durata}</Text>
                    </View>
                    <Text style={[styles.className, ocupat && { color: Colors.onSurfaceVariant }]}>
                      {clasa.nume}
                    </Text>
                    <View style={styles.instructorRow}>
                      <MaterialIcons name="person" size={14} color={Colors.onSurfaceVariant} />
                      <Text style={styles.instructorText}>{clasa.instructor}</Text>
                    </View>
                  </View>
                  {ocupat ? (
                    <View style={[styles.spotsPill, styles.spotsPillFull]}>
                      <Text style={[styles.spotsText, { color: Colors.error }]}>Ocupat</Text>
                    </View>
                  ) : (
                    <View style={styles.spotsPill}>
                      <View style={styles.pulseDot} />
                      <Text style={[styles.spotsText, { color: Colors.primary }]}>{clasa.locuri} locuri</Text>
                    </View>
                  )}
                </View>
                <View style={styles.classBottom}>
                  <Text style={styles.participantsText}>
                    {ocupat ? `${clasa.participanti} participanți` : `${clasa.participanti} înscriși`}
                  </Text>
                  {ocupat ? (
                    <TouchableOpacity style={styles.waitlistBtn} activeOpacity={0.8}>
                      <Text style={styles.waitlistBtnText}>Listă așteptare</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.reserveBtn}
                      activeOpacity={0.8}
                      onPress={() => setConfirmare(clasa)}
                    >
                      <Text style={styles.reserveBtnText}>Rezervă un loc</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </GlassCard>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Sheet: Rezervare Confirmată (ecranul confirmare_rezervare din Stitch) */}
      <Modal visible={confirmare !== null} transparent animationType="slide" onRequestClose={() => setConfirmare(null)}>
        <Pressable style={styles.modalDimmer} onPress={() => setConfirmare(null)} />
        <View style={styles.sheetWrapper}>
          <View style={styles.sheet}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={[styles.sheetContent, { paddingBottom: Math.max(insets.bottom, 16) + 16 }]}>
              <View style={styles.grabber} />
              {/* Glowing success icon */}
              <View style={styles.successIconWrap}>
                <View style={styles.successGlow} />
                <View style={styles.successRing} />
                <MaterialIcons name="check-circle" size={48} color={Colors.primary} />
              </View>
              <Text style={styles.sheetTitle}>Rezervare Confirmată!</Text>
              <Text style={styles.sheetSubtitle}>Locul tău a fost asigurat. Pregătește-te de acțiune!</Text>
              {/* Details card */}
              <View style={styles.detailsCard}>
                <View style={styles.detailsHeader}>
                  <View style={styles.detailsIcon}>
                    <MaterialIcons name="music-note" size={28} color={Colors.tertiary} />
                  </View>
                  <View>
                    <Text style={styles.detailsName}>{confirmare?.nume}</Text>
                    <View style={styles.instructorRow}>
                      <MaterialIcons name="person" size={14} color={Colors.onSurfaceVariant} />
                      <Text style={styles.instructorText}>cu {confirmare?.instructor}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.detailsDivider} />
                <View style={styles.detailsRow}>
                  <View>
                    <Text style={styles.detailsLabel}>DATA</Text>
                    <View style={styles.detailsValueRow}>
                      <MaterialIcons name="calendar-month" size={18} color={Colors.onSurface} />
                      <Text style={styles.detailsValue}>Azi</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.detailsLabel}>ORA</Text>
                    <View style={styles.detailsTimePill}>
                      <MaterialIcons name="schedule" size={18} color={Colors.primary} />
                      <Text style={styles.detailsTime}>{confirmare?.ora}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.doneBtn} activeOpacity={0.85} onPress={() => setConfirmare(null)}>
                <Text style={styles.doneBtnText}>Gata</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  pageTitle: { ...Type.displayLgMobile, color: Colors.onSurface, marginBottom: 8 },
  pageSubtitle: { ...Type.bodyMd, color: Colors.onSurfaceVariant },
  dayChip: {
    width: 56,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipActive: {
    backgroundColor: Colors.primary,
    boxShadow: '0 0 15px rgba(241,90,35,0.4)',
    elevation: 8,
  },
  dayChipGlass: {
    backgroundColor: 'rgba(30,32,36,0.5)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dayChipLabel: { ...Type.labelSm, opacity: 0.8, textTransform: 'uppercase' },
  dayChipDate: { ...Type.headlineSm, marginTop: 4 },
  classTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  classTime: { ...Type.bodyMd, fontFamily: 'Inter_700Bold' },
  timeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.outlineVariant },
  classDuration: { ...Type.labelSm, color: Colors.onSurfaceVariant },
  className: { ...Type.headlineSm, color: Colors.onSurface, marginBottom: 4 },
  instructorRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  instructorText: { ...Type.labelSm, color: Colors.onSurfaceVariant },
  spotsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(30,32,36,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(241,90,35,0.3)',
  },
  spotsPillFull: {
    borderColor: 'rgba(255,180,171,0.3)',
    backgroundColor: 'rgba(255,180,171,0.1)',
  },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  spotsText: { ...Type.labelSm },
  classBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  participantsText: { ...Type.labelSm, color: Colors.onSurfaceVariant },
  reserveBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(241,90,35,0.2)',
    elevation: 4,
  },
  reserveBtnText: { ...Type.labelBold, color: Colors.onPrimary },
  waitlistBtn: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(66,71,82,0.3)',
  },
  waitlistBtnText: { ...Type.labelBold, color: Colors.onSurfaceVariant },
  modalDimmer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheetWrapper: { justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'rgba(18,18,18,0.5)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sheetContent: { paddingHorizontal: Spacing.containerMargin, alignItems: 'center' },
  grabber: {
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 16,
    marginBottom: 8,
  },
  successIconWrap: {
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  successGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 48,
    backgroundColor: 'rgba(241,90,35,0.3)',
  },
  successRing: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 40,
    backgroundColor: 'rgba(18,18,18,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(241,90,35,0.4)',
  },
  sheetTitle: { ...Type.displayLgMobile, color: Colors.onSurface, textAlign: 'center', marginBottom: 8 },
  sheetSubtitle: {
    ...Type.bodyLg,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: Spacing.sectionSpacing,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: 'rgba(26,26,26,0.4)',
    borderRadius: 24,
    padding: Spacing.glassInnerPadding,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: Spacing.sectionSpacing,
  },
  detailsHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  detailsIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,182,146,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,182,146,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsName: { ...Type.headlineMd, color: Colors.onSurface },
  detailsDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 20 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  detailsLabel: {
    ...Type.labelSm,
    color: Colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailsValueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailsValue: { ...Type.bodyLg, fontFamily: 'Inter_600SemiBold', color: Colors.onSurface },
  detailsTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(241,90,35,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(241,90,35,0.2)',
  },
  detailsTime: { ...Type.headlineSm, color: Colors.primary },
  doneBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    boxShadow: '0 8px 25px rgba(241,90,35,0.4)',
    elevation: 8,
  },
  doneBtnText: { ...Type.headlineSm, color: Colors.onPrimary },
});
