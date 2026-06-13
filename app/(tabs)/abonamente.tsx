import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '@/components/Card';
import TopBar from '@/components/TopBar';
import { Colors, Spacing, Type, Radius, Shadow } from '@/constants/theme';
import { PLANURI } from '@/constants/data';

export default function Abonamente() {
  return (
    <View style={styles.container}>
      <TopBar title="Max Fitness Galați" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.pageTitle}>Alege Abonamentul</Text>
          <Text style={styles.pageSubtitle}>
            Alege planul care se potrivește perfect cu obiectivele tale.
          </Text>
        </View>

        <View style={{ gap: Spacing.lg }}>
          {PLANURI.map((plan) => (
            <Card
              key={plan.id}
              padding={Spacing.lg}
              radius={20}
              bordered={plan.popular}
              borderColor={Colors.primary}
              style={plan.popular ? styles.popularCard : undefined}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>CEL MAI POPULAR</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.nume}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{plan.pret} lei</Text>
                <Text style={styles.priceUnit}>/lună</Text>
              </View>

              <View style={styles.benefits}>
                {plan.beneficii.map((b) => (
                  <View key={b.text} style={styles.benefitRow}>
                    <MaterialIcons
                      name={b.inclus ? 'check' : 'close'}
                      size={20}
                      color={b.inclus ? Colors.primary : Colors.outline}
                    />
                    <Text style={[styles.benefitText, !b.inclus && styles.benefitExcluded]}>{b.text}</Text>
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
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: {
    paddingHorizontal: Spacing.screen,
    paddingTop: Spacing.gap,
    paddingBottom: 120,
    gap: Spacing.section,
  },
  pageTitle: { ...Type.display, color: Colors.onSurface, textAlign: 'center' },
  pageSubtitle: {
    ...Type.bodyMd,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: Spacing.sm,
    maxWidth: 300,
  },
  popularCard: { borderWidth: 2 },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: Radius.pill,
    ...Shadow.button,
  },
  popularBadgeText: { ...Type.label, color: Colors.onPrimary },
  planName: { ...Type.headlineMd, color: Colors.onSurface, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 4, marginBottom: Spacing.lg },
  price: { ...Type.stat, color: Colors.primary },
  priceUnit: { ...Type.bodyMd, color: Colors.onSurfaceVariant, marginBottom: 4 },
  benefits: { gap: 12, marginBottom: Spacing.lg },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  benefitText: { ...Type.bodyMd, color: Colors.onSurface, flex: 1 },
  benefitExcluded: { color: Colors.onSurfaceVariant },
  ctaPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.button,
    alignItems: 'center',
    ...Shadow.button,
  },
  ctaPrimaryText: { ...Type.bodyMdSemi, color: Colors.onPrimary },
  ctaOutline: {
    paddingVertical: 14,
    borderRadius: Radius.button,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ctaOutlineText: { ...Type.bodyMdSemi, color: Colors.primary },
});
