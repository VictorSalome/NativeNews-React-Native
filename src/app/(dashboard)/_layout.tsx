import { AppNames } from "@/routes/appRoutes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DashboardLayout() {
  const { Screen } = Tabs;
  const { Home, ProfileUser, News, Weather } = AppNames;
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#27272A" : "#FFFFFF",
          },
          tabBarActiveTintColor: colorScheme === "dark" ? "#1c4aad" : "#1c4aad",
          tabBarInactiveTintColor:
            colorScheme === "dark" ? "#9CA3AF" : "#6B7280",
        }}
      >
        <Screen
          name={Home}
          options={{
            headerShown: false,
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
          }}
        />
        <Screen
          name={News}
          options={{
            headerShown: false,
            title: "Notícias",
            tabBarIcon: ({ color }) => (
              <AntDesign name="cloud" size={24} color={color} />
            ),
          }}
        />
        <Screen
          name={Weather}
          options={{
            headerShown: false,
            title: "Clima",
            tabBarIcon: ({ color }) => (
              <AntDesign name="cloud" size={24} color={color} />
            ),
          }}
        />

        <Screen
          name={ProfileUser}
          options={{
            headerShown: false,
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
