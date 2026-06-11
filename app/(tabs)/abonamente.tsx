import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Platform, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Blobs from '@/components/Blobs';
import GlassCard from '@/components/GlassCard';
import TopBar from '@/components/TopBar';
import { Colors, Spacing, Type, Glass } from '@/constants/theme';

interface Beneficiu {
  text: string;
  inclus: boolean;
}

interface Plan {
  id: string;
  nume: string;
  descriere: string;
  pret: number;
  beneficii: Beneficiu[];
  popular?: boolean;
  fire?: boolean;
}

const PLANURI: Plan[] = [
  {
    id: 'basic',
    nume: 'Basic',
    descriere: 'Acces esențial la facilități',
    pret: 120,
    beneficii: [
      { text: 'Acces gym nelimitat', inclus: true },
      { text: '1 clasă de grup inclusă', inclus: true },
      { text: 'Acces zonă SPA', inclus: false },
    ],
  },
  {
    id: 'full',
    nume: 'Full Access',
    descriere: 'Echilibrul perfect pentru progres',
    pret: 180,
    popular: true,
    fire: true,
    beneficii: [
      { text: 'Acces gym nelimitat', inclus: true },
      { text: 'Clase de grup nelimitate', inclus: true },
      { text: 'Acces zonă SPA (weekend)', inclus: true },
      { text: '1 Evaluare InBody / lună', inclus: true },
    ],
  },
  {
    id: 'premium',
    nume: 'Premium',
    descriere: 'Experiența VIP completă',
    pret: 280,
    beneficii: [
      { text: 'Acces gym 24/7', inclus: true },
      { text: 'Clase premium incluse', inclus: true },
      { text: 'Acces zonă SPA nelimitat', inclus: true },
      { text: 'Sesiuni cu Antrenor (2/lună)', inclus: true },
      { text: 'Parcare VIP asigurată', inclus: true },
    ],
  },
];

export default function Abonamente() {
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
          <Text style={styles.pageTitle}>Alege</Text>
          <Text style={[styles.pageTitle, styles.pageTitleAccent]}>Abonamentul</Text>
          <Text style={styles.pageSubtitle}>
            Deblochează-ți potențialul maxim cu planurile noastre premium.
          </Text>
        </View>

        <View style={{ gap: Spacing.stackGap }}>
          {PLANURI.map((plan) => (
            <GlassCard
              key={plan.id}
              radius={12}
              padding={Spacing.glassInnerPadding}
              gradient={plan.popular ? Glass.gradientPopular : Glass.gradient}
              borderColor={plan.popular ? Glass.borderPopular : Glass.border}
              style={plan.popular ? styles.popularCard : undefined}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>CEL MAI POPULAR</Text>
                </View>
              )}
              <View style={[styles.planTop, plan.popular && { paddingTop: 8 }]}>
                <View style={{ flex: 1 }}>
                  <View style={styles.planNameRow}>
                    <Text style={styles.planName}>{plan.nume}</Text>
                    {plan.fire && (
                      <MaterialIcons name="local-fire-department" size={18} color={Colors.tertiary} />
                    )}
                  </View>
                  <Text style={styles.planDesc}>{plan.descriere}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.planPrice}>
                    {plan.pret} <Text style={styles.planPriceUnit}>lei</Text>
                  </Text>
                  <Text style={styles.planPerMonth}>/ lună</Text>
                </View>
              </View>
              <View style={[styles.divider, plan.popular && { backgroundColor: 'rgba(241,90,35,0.2)' }]} />
              <View style={{ gap: 12 }}>
                {plan.beneficii.map((b) => (
                  <View key={b.text} style={styles.benefitRow}>
                    <MaterialIcons
                      name={b.inclus ? 'check-circle' : 'cancel'}
                      size={20}
                      color={b.inclus ? Colors.primary : 'rgba(195,198,212,0.5)'}
                    />
                    <Text style={[styles.benefitText, !b.inclus && styles.benefitTextExcluded]}>
                      {b.text}
                    </Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={plan.popular ? styles.ctaPrimary : styles.ctaOutline}
                activeOpacity={0.85}
              >
                <Text style={plan.popular ? styles.ctaPrimaryText : styles.ctaOutlineText}>
                  Alege {plan.nume}
                </Text>
              </TouchableOpacity>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  pageTitle: { ...Type.displayLgMobile, color: Colors.white },
  pageTitleAccent: {
    color: Colors.primary,
    // textShadow (string) e suportat doar de react-native-web; pe native raman props clasice
    ...Platform.select<TextStyle>({
      web: { textShadow: '0 0 20px rgba(241,90,35,0.5)' } as TextStyle,
      default: {
        textShadowColor: 'rgba(241,90,35,0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
      },
    }),
  },
  pageSubtitle: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginTop: 8 },
  popularCard: { transform: [{ scale: 1.02 }], zIndex: 10 },
  popularBadge: {
    position: 'absolute',
    top: -Spacing.glassInnerPadding,
    right: -Spacing.glassInnerPadding,
    backgroundColor: Colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  popularBadgeText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.tertiaryFixed,
    textTransform: 'uppercase',
  },
  planTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  planNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  planName: { ...Type.headlineSm, color: Colors.white },
  planDesc: { ...Type.labelSm, color: Colors.onSurfaceVariant, marginTop: 4 },
  planPrice: { ...Type.headlineMd, color: Colors.white },
  planPriceUnit: { ...Type.bodyMd, color: Colors.onSurfaceVariant },
  planPerMonth: { ...Type.labelSm, color: Colors.onSurfaceVariant },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  benefitText: { ...Type.bodyMd, color: Colors.onSurface, flex: 1 },
  benefitTextExcluded: { color: 'rgba(195,198,212,0.5)' },
  ctaPrimary: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    boxShadow: '0 0 20px rgba(241,90,35,0.4)',
    elevation: 8,
  },
  ctaPrimaryText: { ...Type.labelBold, color: Colors.onPrimary },
  ctaOutline: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(241,90,35,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(241,90,35,0.5)',
    alignItems: 'center',
  },
  ctaOutlineText: { ...Type.labelBold, color: Colors.primary },
});
