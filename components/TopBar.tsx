import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Type } from '@/constants/theme';

// TopAppBar din Stitch: avatar + "Bună dimineața" + clopotel cu punct rosu
export default function TopBar({ subtitle }: { subtitle?: string }) {
  const insets = useSafeAreaInsets();
  const ora = new Date().getHours();
  const salut = ora < 12 ? 'Bună dimineața' : ora < 18 ? 'Bună ziua' : 'Bună seara';

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={22} color={Colors.onSurfaceVariant} />
        </View>
        <View>
          <Text style={styles.greeting}>{salut}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <TouchableOpacity style={styles.bell} activeOpacity={0.7}>
        <MaterialIcons name="notifications-none" size={24} color={Colors.primary} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.containerMargin,
    paddingBottom: Spacing.elementPadding,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: { ...Type.headlineSm, color: Colors.onSurface },
  subtitle: { ...Type.bodyMd, color: Colors.onSurfaceVariant },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30,32,36,0.5)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
});
