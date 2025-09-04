import "./global.css";

import { Redirect } from "expo-router";
import { LoadingScreens } from "../components/LoadingScreens";
import { useAuthContext } from "../context/authContext";
import { useOnboardingContext } from "../context/onboardContext";
import { AppRoutes } from "../routes/appRoutes";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const { hasSeenOnboarding } = useOnboardingContext();

  if (isLoading) {
    return <LoadingScreens />;
  }

  if (hasSeenOnboarding === false) {
    return <Redirect href={AppRoutes.ApresentationTwo} />;
  }

  return isAuthenticated ? (
    <Redirect href={AppRoutes.Home} />
  ) : (
    <Redirect href={AppRoutes.SignIn} />
  );
}
