import { AppNames } from "@/routes/appRoutes";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DashboardLayout() {
  const { Screen } = Tabs;
  const { Home, ProfileUser } = AppNames;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Tabs>
        <Screen
          name={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Screen
          name={ProfileUser}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
