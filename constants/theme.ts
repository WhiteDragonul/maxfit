// Design tokens "Liquid Vitality" — preluate exact din exportul Stitch AI (orange edition)
export const Colors = {
  background: '#121212',
  surface: '#121212',
  surfaceContainerLowest: '#0a0a0a',
  surfaceContainerLow: '#1a1a1a',
  surfaceContainer: '#1d1f25',
  surfaceContainerHigh: '#282a30',
  surfaceContainerHighest: '#33353b',
  surfaceVariant: '#2a2a2a',
  onSurface: '#e2e2ea',
  onSurfaceVariant: '#c3c6d4',
  outline: '#8d909d',
  outlineVariant: '#424752',
  primary: '#F15A23',
  onPrimary: '#ffffff',
  primaryFixed: '#ffb089',
  primaryFixedDim: '#d94e1b',
  primaryContainer: '#5e210a',
  onPrimaryContainer: '#ffb692',
  tertiary: '#ffb692',
  tertiaryFixed: '#ffdbcb',
  tertiaryContainer: '#883700',
  secondary: '#c6c6c6',
  error: '#ffb4ab',
  white: '#ffffff',
};

// .glass-card / .glass-panel din CSS-ul Stitch
export const Glass = {
  gradient: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'] as const,
  gradientPopular: ['rgba(241,90,35,0.15)', 'rgba(241,90,35,0.05)'] as const,
  gradientPromo: ['rgba(255,176,137,0.15)', 'rgba(241,90,35,0.1)'] as const,
  border: 'rgba(255,255,255,0.15)',
  borderSubtle: 'rgba(255,255,255,0.10)',
  borderPopular: 'rgba(241,90,35,0.3)',
  blur: 20,
  pillBackground: 'rgba(30,32,36,0.5)',
};

export const Spacing = {
  glassInnerPadding: 24,
  sectionSpacing: 32,
  stackGap: 16,
  containerMargin: 20,
  elementPadding: 12,
};

export const Type = {
  displayLgMobile: { fontFamily: 'Inter_800ExtraBold', fontSize: 28, lineHeight: 34 },
  headlineMd: { fontFamily: 'Inter_700Bold', fontSize: 24, lineHeight: 30 },
  headlineSm: { fontFamily: 'Inter_600SemiBold', fontSize: 20, lineHeight: 25 },
  titleLg: { fontFamily: 'Inter_700Bold', fontSize: 22, lineHeight: 28 },
  titleMd: { fontFamily: 'Inter_600SemiBold', fontSize: 16, lineHeight: 24 },
  bodyLg: { fontFamily: 'Inter_400Regular', fontSize: 17, lineHeight: 24 },
  bodyMd: { fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 20 },
  labelBold: { fontFamily: 'Inter_600SemiBold', fontSize: 13, lineHeight: 18 },
  labelSm: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 16 },
};
