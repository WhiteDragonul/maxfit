import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { Colors } from '@/constants/theme';
import { ReservationsProvider } from '@/context/Reservations';
import { LocationProvider } from '@/context/Location';
import { MembershipProvider } from '@/context/Membership';
import { AuthProvider, useAuth } from '@/context/Auth';

// Gate de autentificare: fără cont conectat → /login; conectat pe /login → în aplicație.
function RootNavigator() {
  const { email, ready } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const peLogin = segments[0] === 'login';
    if (!email && !peLogin) router.replace('/login');
    else if (email && peLogin) router.replace('/');
  }, [email, ready, segments, router]);

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    />
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  return (
    <AuthProvider>
      <LocationProvider>
        <MembershipProvider>
          <ReservationsProvider>
            <StatusBar style="dark" />
            <RootNavigator />
          </ReservationsProvider>
        </MembershipProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
