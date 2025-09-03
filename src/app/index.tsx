import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuthContext } from "./context/authContext";
import { AppRoutes } from "./routes/appRoutes";

export default function Index() {
  const { isAuthenticated, isLoading, tokens } = useAuthContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#007AFF' />
      </View>
    );
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
