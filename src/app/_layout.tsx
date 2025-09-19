import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "./global.css";

import AuthProvider from "../context/authContext";
import { OnboardingProvider } from "../context/onboardContext";
import { ThemeProvider } from "../context/themeContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OnboardingProvider>
          <ThemeProvider>
            <SafeAreaProvider>
              <StatusBar style="dark" />
              <Slot />
              <Toast />
            </SafeAreaProvider>
          </ThemeProvider>
        </OnboardingProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
