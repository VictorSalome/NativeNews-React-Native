import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DashboardLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style='dark' />
      <Tabs>
        <Tabs.Screen name='home' />
        <Tabs.Screen name='profileUser' />
      </Tabs>
    </SafeAreaProvider>
  );
}
