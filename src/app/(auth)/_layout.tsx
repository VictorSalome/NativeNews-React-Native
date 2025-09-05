import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNames } from "../../routes/appRoutes";

export default function AuthLayout() {
  const { Screen } = Stack;
  const { SignUp, SignIn, ForgotPassword } = AppNames;
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-surface dark:bg-surface-dark">
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#1F2937" : "#FFFFFF",
          },
          headerTintColor: colorScheme === "dark" ? "#F9FAFB" : "#111827",
        }}
      >
        <Screen name={SignUp} options={{ headerShown: false }} />
        <Screen name={SignIn} options={{ headerShown: false }} />
        <Screen
          name={ForgotPassword}
          options={{
            headerShown: true,
            title: "",
            headerBackTitle: "Voltar",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#27272A" : "#FFFFFF",
            },
            headerTintColor: colorScheme === "dark" ? "#F9FAFB" : "#111827",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
