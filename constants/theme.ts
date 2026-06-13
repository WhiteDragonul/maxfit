// Design tokens "Premium Fitness System" — light theme alb + portocaliu, din exportul Stitch.
// Minimalist, editorial: fundal off-white, carduri albe cu umbră difuză, accent portocaliu folosit cu măsură.
export const Colors = {
  background: '#f9f9fa', // fundal aplicație
  surface: '#ffffff', // carduri (surface-container-lowest)
  surfaceAlt: '#f3f3f4', // butoane secundare / chip-uri (surface-container-low)
  surfaceHigh: '#eeeeef', // pill „rezervat" (surface-container)
  border: '#e2e2e3', // linii hairline (surface-container-highest)
  onSurface: '#1a1c1d', // titluri / text principal
  onSurfaceVariant: '#5f5e61', // text secundar
  outline: '#8e7067',
  outlineVariant: '#e2bfb4', // bordura chip-urilor de zi
  primary: '#F15A23', // accent portocaliu
  onPrimary: '#ffffff',
  primaryDim: '#d94e1b',
  primarySoft: '#ffe1d6', // fundal pill accent (ex. „10 locuri")
  onPrimarySoft: '#842500', // text pe pill accent
  primaryTint: 'rgba(241,90,35,0.10)', // fundal translucid (icoane, time-box)
  error: '#ba1a1a',
  white: '#ffffff',
};

// Umbre (boxShadow string suportat de RN 0.81 + react-native-web; elevation pentru Android)
export const Shadow = {
  card: { boxShadow: '0px 1px 3px rgba(0,0,0,0.06)', elevation: 2 },
  nav: { boxShadow: '0px -4px 12px rgba(0,0,0,0.08)', elevation: 12 },
  button: { boxShadow: '0px 2px 8px rgba(241,90,35,0.25)', elevation: 4 },
};

export const Spacing = {
  screen: 20, // container-margin
  gap: 16, // gutter / space-md
  section: 32, // space-xl
  sm: 8,
  lg: 24,
  cardPadding: 16,
};

export const Radius = {
  card: 16,
  button: 12,
  chip: 12,
  pill: 999,
  sheet: 24,
};

export const Type = {
  display: { fontFamily: 'Inter_800ExtraBold', fontSize: 32, lineHeight: 38, letterSpacing: -0.5 },
  headlineLg: { fontFamily: 'Inter_700Bold', fontSize: 28, lineHeight: 34, letterSpacing: -0.3 },
  headlineMd: { fontFamily: 'Inter_700Bold', fontSize: 24, lineHeight: 30, letterSpacing: -0.2 },
  bodyLg: { fontFamily: 'Inter_400Regular', fontSize: 18, lineHeight: 28 },
  bodyLgSemi: { fontFamily: 'Inter_600SemiBold', fontSize: 18, lineHeight: 26 },
  bodyMd: { fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
  bodyMdSemi: { fontFamily: 'Inter_600SemiBold', fontSize: 16, lineHeight: 24 },
  bodySm: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20 },
  label: { fontFamily: 'Inter_600SemiBold', fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  stat: { fontFamily: 'Inter_800ExtraBold', fontSize: 32, lineHeight: 34, letterSpacing: -1 },
};
