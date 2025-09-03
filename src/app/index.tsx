import "./global.css";

import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuthContext } from "../context/authContext";
import { useOnboardingContext } from "../context/onboardContext";
import { AppRoutes } from "../routes/appRoutes";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const { hasSeenOnboarding } = useOnboardingContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#007AFF' />
      </View>
    );
  }

  if (hasSeenOnboarding === true) {
    return <Redirect href={AppRoutes.ApresentationTwo} />;
  }

  return isAuthenticated ? (
    <Redirect href={AppRoutes.Home} />
  ) : (
    <Redirect href={AppRoutes.SignIn} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
