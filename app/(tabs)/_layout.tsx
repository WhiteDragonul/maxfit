import { Tabs } from 'expo-router';
import LiquidTabBar from '@/components/LiquidTabBar';
import { Colors } from '@/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <LiquidTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: Colors.background },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="clase" />
      <Tabs.Screen name="antrenamente" />
      <Tabs.Screen name="abonamente" />
      <Tabs.Screen name="profil" />
    </Tabs>
  );
}
