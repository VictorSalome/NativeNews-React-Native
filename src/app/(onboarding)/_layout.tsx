import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNames } from "../routes/appRoutes";

export default function OnboardingLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AppNames.ApresentationOne} />
        <Stack.Screen name={AppNames.ApresentationTwo} />
        <Stack.Screen name={AppNames.ApresentationThree} />
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
