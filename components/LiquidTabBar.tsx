import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Type } from '@/constants/theme';

const TAB_CONFIG: Record<string, { label: string; icon: (color: string) => React.ReactNode }> = {
  index: {
    label: 'Acasă',
    icon: (c) => <MaterialIcons name="home" size={24} color={c} />,
  },
  clase: {
    label: 'Clase',
    icon: (c) => <MaterialIcons name="fitness-center" size={24} color={c} />,
  },
  antrenamente: {
    label: 'Antrenamente',
    icon: (c) => <MaterialCommunityIcons name="dumbbell" size={24} color={c} />,
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

// BottomNavBar din Stitch: pill plutitor la 24px de margine, backdrop-blur-xl,
// bordura alba 20%, item activ cu bg-primary/10 si glow portocaliu
export default function LiquidTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) + 12 }]}>
      <View style={styles.bar}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.border} />
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[route.name];
          if (!config) return null;
          const active = state.index === index;
          const color = active ? Colors.primary : Colors.onSurfaceVariant;
          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.item, active && styles.itemActive]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              {config.icon(color)}
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {config.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '92%',
    maxWidth: 448,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(26,27,33,0.4)',
    boxShadow: '0 25px 25px rgba(0,0,0,0.5)',
    elevation: 12,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    pointerEvents: 'none',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 999,
    minWidth: 56,
  },
  itemActive: {
    backgroundColor: 'rgba(241,90,35,0.1)',
    boxShadow: '0 0 15px rgba(241,90,35,0.3)',
    elevation: 6,
  },
  label: {
    ...Type.labelSm,
    fontSize: 10,
    marginTop: 4,
  },
});
