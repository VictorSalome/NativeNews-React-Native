import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNames } from "../routes/appRoutes";

export default function AuthLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack>
        <Stack.Screen name={AppNames.SignUp} options={{ headerShown: false }} />
        <Stack.Screen name={AppNames.SignIn} options={{ headerShown: false }} />
        <Stack.Screen
          name={AppNames.ForgotPassword}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
