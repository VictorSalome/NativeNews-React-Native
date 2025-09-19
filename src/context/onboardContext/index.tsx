import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IOnboardingContext {
  hasSeenOnboarding: boolean | null;
  setHasSeenOnboarding: (value: boolean) => Promise<void>;
  isLoading: boolean;
}

const OnboardingContext = createContext<IOnboardingContext | undefined>(
  undefined,
);

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider",
    );
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [hasSeenOnboarding, setHasSeenOnboardingState] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("hasSeenOnboarding");
        setHasSeenOnboardingState(value === "true");
      } catch (error) {
        console.error(
          "[OnboardingContext] Erro ao verificar status do onboarding:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  const setHasSeenOnboarding = async (value: boolean) => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", value.toString());
      setHasSeenOnboardingState(value);
    } catch (error) {
      console.error(
        "[OnboardingContext] Erro ao definir status do onboarding:",
        error,
      );
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasSeenOnboarding,
        setHasSeenOnboarding,
        isLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
