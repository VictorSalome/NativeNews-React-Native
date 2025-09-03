import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";

interface IThemeContext {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => Promise<void>;
  isLoading: boolean;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themePreference");

        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === "dark");
        } else {
          setIsDarkMode(colorScheme === "dark");
        }
      } catch (error) {
        console.error("[ThemeContext] Erro ao carregar preferência de tema:", error);
        setIsDarkMode(colorScheme === "dark");
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme(!isDarkMode);
  };

  const setTheme = async (isDark: boolean) => {
    try {
      const themeValue = isDark ? "dark" : "light";
      await AsyncStorage.setItem("themePreference", themeValue);
      setIsDarkMode(isDark);
      console.log("[ThemeContext] Tema definido para:", themeValue);
    } catch (error) {
      console.error("[ThemeContext] Erro ao salvar preferência de tema:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: !!isDarkMode,
        toggleTheme,
        setTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
