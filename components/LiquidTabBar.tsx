import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Type, Shadow } from '@/constants/theme';

const TAB_CONFIG: Record<string, { label: string; icon: (color: string) => React.ReactNode }> = {
  index: {
    label: 'Acasă',
    icon: (c) => <MaterialIcons name="home" size={24} color={c} />,
  },
  clase: {
    label: 'Clase',
    icon: (c) => <MaterialIcons name="calendar-today" size={22} color={c} />,
  },
  antrenori: {
    label: 'Antrenori',
    icon: (c) => <MaterialCommunityIcons name="whistle" size={24} color={c} />,
  },
  abonamente: {
    label: 'Abonamente',
    icon: (c) => <MaterialIcons name="card-membership" size={24} color={c} />,
  },
  profil: {
    label: 'Profil',
    icon: (c) => <MaterialIcons name="person" size={24} color={c} />,
  },
};

// BottomNavBar light din Stitch: bară albă pe toată lățimea, colțuri sus rotunjite,
// umbră difuză în sus; tab activ portocaliu cu punct dedesubt.
export default function LiquidTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {state.routes.map((route, index) => {
        const config = TAB_CONFIG[route.name];
        if (!config) return null;
        const active = state.index === index;
        const color = active ? Colors.primary : Colors.onSurfaceVariant;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.item}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}
          >
            {config.icon(color)}
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {config.label}
            </Text>
            {active && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 10,
    paddingHorizontal: 8,
    ...Shadow.nav,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 2,
  },
  label: {
    ...Type.label,
    fontSize: 11,
    letterSpacing: 0,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 2,
  },
});
