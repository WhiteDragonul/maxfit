import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

interface BlobSpec {
  size: number;
  color: string;
  opacity: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

function Blob({ size, color, opacity, ...pos }: BlobSpec) {
  return (
    <View style={[styles.blob, pos, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id="g" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
            <Stop offset="70%" stopColor={color} stopOpacity={opacity * 0.35} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#g)" />
      </Svg>
    </View>
  );
}

// Blob-urile organice din fundal (.blob-1/.blob-2/.blob-3 din CSS-ul Stitch),
// redate cu gradiente radiale SVG in locul filter: blur(80px)
export default function Blobs() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Blob size={300} color="#F15A23" opacity={0.3} top={-80} left={-80} />
      <Blob size={400} color="#ff8a5c" opacity={0.25} bottom={-120} right={-100} />
      <Blob size={250} color="#d94e1b" opacity={0.2} top={320} left={180} />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute' },
});
