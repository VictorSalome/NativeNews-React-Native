import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "../context/authContext";
import { OnboardingProvider } from "../context/onboardContext";
import { ThemeProvider } from "../context/themeContext";

// Criando uma instância do QueryClient para o React Query
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OnboardingProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar style='dark' />
              <Slot />
            </SafeAreaProvider>
          </ThemeProvider>
        </OnboardingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#7F3DFF",
    fontWeight: "500",
  },
});
