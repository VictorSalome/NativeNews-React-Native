import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNames } from "../../routes/appRoutes";

export default function OnboardingLayout() {
  const { Screen } = Stack;
  const { ApresentationOne, ApresentationTwo } = AppNames;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack screenOptions={{ headerShown: false }}>
        <Screen name={ApresentationOne} />
        <Screen name={ApresentationTwo} />
      </Stack>
    </SafeAreaView>
  );
}
