import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Blobs from '@/components/Blobs';
import GlassCard from '@/components/GlassCard';
import { Colors, Spacing, Type } from '@/constants/theme';

const ACTIUNI = [
  { id: 'istoric', label: 'Istoric Intrări', icon: 'history' as const, tint: Colors.primary, bg: 'rgba(241,90,35,0.1)' },
  { id: 'plati', label: 'Plăți & Facturi', icon: 'credit-card' as const, tint: Colors.tertiary, bg: 'rgba(255,182,146,0.1)' },
  { id: 'setari', label: 'Setări Cont', icon: 'settings' as const, tint: Colors.secondary, bg: 'rgba(198,198,198,0.1)' },
  { id: 'suport', label: 'Suport', icon: 'support-agent' as const, tint: Colors.error, bg: 'rgba(255,180,171,0.1)' },
];

export default function Profil() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Blobs />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.containerMargin,
          paddingTop: insets.top + 16,
          paddingBottom: 128,
          gap: Spacing.stackGap,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Member Card */}
        <GlassCard radius={12} padding={Spacing.glassInnerPadding}>
          <View style={styles.memberRow}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={32} color={Colors.onSurfaceVariant} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName}>Alexandru Paun</Text>
              <View style={styles.premiumBadge}>
                <MaterialIcons name="stars" size={14} color={Colors.tertiary} />
                <Text style={styles.premiumBadgeText}>MEMBRU PREMIUM</Text>
              </View>
            </View>
          </View>
          <View style={styles.memberStats}>
            <View style={styles.memberStatCard}>
              <Text style={styles.memberStatLabel}>ANTRENAMENTE</Text>
              <Text style={[styles.memberStatValue, { color: Colors.primary }]}>124</Text>
            </View>
            <View style={styles.memberStatCard}>
              <Text style={styles.memberStatLabel}>STATUS CONT</Text>
              <Text style={[styles.memberStatValueSm, { color: Colors.tertiary }]}>Activ</Text>
            </View>
          </View>
        </GlassCard>

        {/* QR Check-in */}
        <GlassCard radius={12} padding={Spacing.glassInnerPadding}>
          <View style={{ alignItems: 'center', gap: 24 }}>
            <Text style={styles.qrTitle}>Check-in Rapid</Text>
            <Text style={styles.qrSubtitle}>Scanează acest cod la recepție pentru acces instant.</Text>
            <View style={styles.qrFrame}>
              <View style={styles.qrInner}>
                <MaterialIcons name="qr-code-2" size={120} color="#9ca3af" />
              </View>
            </View>
            <TouchableOpacity style={styles.refreshBtn} activeOpacity={0.8}>
              <MaterialIcons name="refresh" size={20} color={Colors.primary} />
              <Text style={styles.refreshBtnText}>Reîncarcă Codul</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        {/* Quick Actions Bento Grid */}
        <View>
          <Text style={styles.sectionLabel}>ACȚIUNI RAPIDE</Text>
          <View style={styles.actionsGrid}>
            {ACTIUNI.map((a) => (
              <TouchableOpacity key={a.id} style={styles.actionCard} activeOpacity={0.8}>
                <View style={[styles.actionIcon, { backgroundColor: a.bg }]}>
                  <MaterialIcons name={a.icon} size={24} color={a.tint} />
                </View>
                <Text style={styles.actionLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact */}
        <GlassCard radius={12} padding={Spacing.glassInnerPadding} style={{ marginBottom: Spacing.sectionSpacing }}>
          <Text style={styles.contactTitle}>Contactează-ne</Text>
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              style={styles.contactRow}
              activeOpacity={0.8}
              onPress={() => Linking.openURL('tel:+40123456789')}
            >
              <View style={styles.contactIcon}>
                <MaterialIcons name="call" size={22} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Sună Recepția</Text>
                <Text style={styles.contactValue}>+40 123 456 789</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactRow}
              activeOpacity={0.8}
              onPress={() => Linking.openURL('mailto:contact@maxfit.ro')}
            >
              <View style={styles.contactIcon}>
                <MaterialIcons name="mail" size={22} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Trimite Email</Text>
                <Text style={styles.contactValue}>contact@maxfit.ro</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={Colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 2,
    borderColor: 'rgba(241,90,35,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberName: { ...Type.headlineSm, color: Colors.onSurface },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(136,55,0,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255,182,146,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 4,
  },
  premiumBadgeText: {
    ...Type.labelSm,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.tertiary,
    letterSpacing: 0.5,
  },
  memberStats: { flexDirection: 'row', gap: 16, marginTop: 16 },
  memberStatCard: {
    flex: 1,
    backgroundColor: 'rgba(42,42,42,0.4)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  memberStatLabel: {
    ...Type.labelSm,
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 4,
  },
  memberStatValue: { ...Type.headlineMd },
  memberStatValueSm: { ...Type.headlineSm, marginTop: 2 },
  qrTitle: { ...Type.headlineSm, color: Colors.onSurface, textAlign: 'center' },
  qrSubtitle: {
    ...Type.bodyMd,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 250,
  },
  qrFrame: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 4,
  },
  qrInner: {
    width: 192,
    height: 192,
    backgroundColor: '#e5e7eb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(66,71,82,0.3)',
  },
  refreshBtnText: { ...Type.labelBold, color: Colors.primary },
  sectionLabel: {
    ...Type.labelBold,
    color: Colors.onSurfaceVariant,
    letterSpacing: 2,
    marginBottom: 16,
    paddingLeft: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.stackGap,
  },
  actionCard: {
    width: '47%',
    flexGrow: 1,
    aspectRatio: 1,
    backgroundColor: 'rgba(42,42,42,0.4)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { ...Type.labelBold, color: Colors.onSurface, textAlign: 'center' },
  contactTitle: { ...Type.headlineSm, color: Colors.onSurface, marginBottom: 16 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(42,42,42,0.4)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(241,90,35,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: { ...Type.bodyMd, fontFamily: 'Inter_600SemiBold', color: Colors.onSurface },
  contactValue: { ...Type.labelSm, color: Colors.onSurfaceVariant, marginTop: 2 },
});
