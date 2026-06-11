import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Blobs from '@/components/Blobs';
import GlassCard from '@/components/GlassCard';
import TopBar from '@/components/TopBar';
import { Colors, Spacing, Type } from '@/constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Plan {
  id: string;
  nume: string;
  meta: string;
  icon: React.ReactNode;
  iconAccent: boolean;
  exercitii: { nume: string; detalii: string }[];
  ctaPrimar: boolean;
}

const PLANURI: Plan[] = [
  {
    id: 'piept',
    nume: 'Piept & Triceps',
    meta: '6 Exerciții • 45 min',
    icon: <MaterialIcons name="fitness-center" size={28} color={Colors.primary} />,
    iconAccent: true,
    ctaPrimar: true,
    exercitii: [
      { nume: 'Împins cu haltera la piept', detalii: '4 Serii • 8-10 Repetări' },
      { nume: 'Fluturări cu gantere (Înclinat)', detalii: '3 Serii • 12 Repetări' },
      { nume: 'Extensii triceps la scripete', detalii: '4 Serii • 15 Repetări' },
    ],
  },
  {
    id: 'spate',
    nume: 'Spate & Biceps',
    meta: '7 Exerciții • 50 min',
    icon: <MaterialCommunityIcons name="rowing" size={28} color={Colors.onSurface} />,
    iconAccent: false,
    ctaPrimar: false,
    exercitii: [
      { nume: 'Tracțiuni la bară fixă', detalii: '4 Serii • Până la epuizare' },
      { nume: 'Ramat cu haltera', detalii: '4 Serii • 10 Repetări' },
      { nume: 'Flexii cu gantere (Biceps)', detalii: '3 Serii • 12 Repetări / braț' },
    ],
  },
  {
    id: 'picioare',
    nume: 'Picioare',
    meta: '5 Exerciții • 60 min',
    icon: <MaterialIcons name="directions-run" size={28} color={Colors.onSurface} />,
    iconAccent: false,
    ctaPrimar: false,
    exercitii: [
      { nume: 'Genuflexiuni cu bara', detalii: '4 Serii • 8-10 Repetări' },
      { nume: 'Presă pentru picioare', detalii: '4 Serii • 10-12 Repetări' },
      { nume: 'Ridicări pe vârfuri', detalii: '4 Serii • 15-20 Repetări' },
    ],
  },
  {
    id: 'umeri',
    nume: 'Umeri & Abdomen',
    meta: '8 Exerciții • 40 min',
    icon: <MaterialIcons name="sports-gymnastics" size={28} color={Colors.onSurface} />,
    iconAccent: false,
    ctaPrimar: false,
    exercitii: [
      { nume: 'Presă militară cu gantere', detalii: '4 Serii • 8-10 Repetări' },
      { nume: 'Ridicări laterale', detalii: '4 Serii • 12-15 Repetări' },
      { nume: 'Plank', detalii: '3 Serii • 60 sec' },
    ],
  },
];

export default function Antrenamente() {
  const [deschis, setDeschis] = useState<string | null>(null);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDeschis(deschis === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Blobs />
      <TopBar />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.containerMargin,
          paddingTop: Spacing.sectionSpacing,
          paddingBottom: 128,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: Spacing.sectionSpacing }}>
          <Text style={styles.pageTitle}>Antrenamente</Text>
          <Text style={styles.pageSubtitle}>Alege grupa musculară pentru antrenamentul de azi.</Text>
        </View>

        <View style={{ gap: Spacing.stackGap }}>
          {PLANURI.map((plan) => {
            const expandat = deschis === plan.id;
            return (
              <GlassCard
                key={plan.id}
                radius={24}
                borderColor={expandat ? 'rgba(241,90,35,0.3)' : 'rgba(255,255,255,0.05)'}
              >
                <TouchableOpacity style={styles.planHeader} onPress={() => toggle(plan.id)} activeOpacity={0.8}>
                  <View style={styles.planHeaderLeft}>
                    <View
                      style={[
                        styles.planIcon,
                        plan.iconAccent ? styles.planIconAccent : styles.planIconNeutral,
                      ]}
                    >
                      {plan.icon}
                    </View>
                    <View>
                      <Text style={styles.planName}>{plan.nume}</Text>
                      <Text style={styles.planMeta}>{plan.meta}</Text>
                    </View>
                  </View>
                  <MaterialIcons
                    name={expandat ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color={Colors.onSurfaceVariant}
                  />
                </TouchableOpacity>
                {expandat && (
                  <View style={styles.planBody}>
                    {plan.exercitii.map((ex) => (
                      <View key={ex.nume} style={styles.exercise}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.exerciseName}>{ex.nume}</Text>
                          <Text style={styles.exerciseDetails}>{ex.detalii}</Text>
                        </View>
                        <MaterialIcons name="play-circle-outline" size={20} color={Colors.outlineVariant} />
                      </View>
                    ))}
                    <TouchableOpacity
                      style={plan.ctaPrimar ? styles.startBtn : styles.secondaryBtn}
                      activeOpacity={0.85}
                    >
                      <Text style={plan.ctaPrimar ? styles.startBtnText : styles.secondaryBtnText}>
                        {plan.ctaPrimar ? 'Începe Antrenamentul' : 'Vezi toate exercițiile'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </GlassCard>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  pageTitle: { ...Type.displayLgMobile, color: Colors.onSurface, marginBottom: 8 },
  pageSubtitle: { ...Type.bodyMd, color: Colors.onSurfaceVariant },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  planHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planIconAccent: {
    backgroundColor: 'rgba(241,90,35,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(241,90,35,0.3)',
  },
  planIconNeutral: {
    backgroundColor: Colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  planName: { ...Type.titleLg, color: Colors.onSurface },
  planMeta: { ...Type.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 },
  planBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 8,
    marginHorizontal: 20,
    paddingLeft: 0,
    paddingRight: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    gap: 16,
  },
  exercise: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  exerciseName: { ...Type.titleMd, color: Colors.onSurface },
  exerciseDetails: { ...Type.bodyMd, color: Colors.outline, marginTop: 2 },
  startBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    boxShadow: '0 0 20px rgba(241,90,35,0.4)',
    elevation: 8,
  },
  startBtnText: { ...Type.labelBold, color: Colors.onPrimary },
  secondaryBtn: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  secondaryBtnText: { ...Type.labelBold, color: Colors.onSurface },
});
