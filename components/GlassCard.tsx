import { ReactNode } from 'react';
import { StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Glass } from '@/constants/theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  gradient?: readonly [string, string];
  borderColor?: string;
  padding?: number;
}

// Echivalentul .glass-card / .glass-panel din exportul Stitch:
// gradient 135deg alb 8%→2%, backdrop blur 20px, bordura 0.5px alb 15%
export default function GlassCard({
  children,
  style,
  radius = 24,
  gradient = Glass.gradient,
  borderColor = Glass.border,
  padding,
}: Props) {
  return (
    <View style={[{ borderRadius: radius, overflow: 'hidden' }, style]}>
      <BlurView intensity={Glass.blur} tint="dark" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: radius, borderWidth: StyleSheet.hairlineWidth, borderColor },
        ]}
        pointerEvents="none"
      />
      <View style={{ padding }}>{children}</View>
    </View>
  );
}
