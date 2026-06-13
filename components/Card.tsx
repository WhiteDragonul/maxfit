import { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Radius, Shadow } from '@/constants/theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  padding?: number;
  bordered?: boolean; // bordură vizibilă în loc/peste umbră (ex. cardul „popular")
  borderColor?: string;
}

// Cardul light standard: alb, colțuri rotunjite, umbră difuză (0px 1px 3px rgba(0,0,0,0.06)).
export default function Card({
  children,
  style,
  radius = Radius.card,
  padding = 16,
  bordered = false,
  borderColor = Colors.border,
}: Props) {
  return (
    <View
      style={[
        styles.card,
        { borderRadius: radius, padding },
        bordered && { borderWidth: 1, borderColor },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    ...Shadow.card,
  },
});
