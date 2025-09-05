import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNames } from "../../routes/appRoutes";

export default function AuthLayout() {
  const { Screen } = Stack;
  const { SignUp, SignIn, ForgotPassword } = AppNames;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack>
        <Screen name={SignUp} options={{ headerShown: false }} />
        <Screen name={SignIn} options={{ headerShown: false }} />
        <Screen
          name={ForgotPassword}
          options={{
            headerShown: true,
            title: "",
            headerBackTitle: "Voltar",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
