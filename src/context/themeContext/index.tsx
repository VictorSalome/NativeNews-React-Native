import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { useColorScheme } from 'nativewind';

interface IThemeContext {
  isDarkMode: boolean;
  theme: 'light' | 'dark';
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

  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themePreference");

        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === "dark");
        } else {
          setIsDarkMode(systemColorScheme === "dark");
        }
      } catch (error) {
        console.error(
          "[ThemeContext] Erro ao carregar preferência de tema:",
          error,
        );
        setIsDarkMode(systemColorScheme === "dark");
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]);

  useEffect(() => {
    if (isDarkMode !== null) {
      setColorScheme(isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

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
      console.error(
        "[ThemeContext] Erro ao salvar preferência de tema:",
        error,
      );
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode: !!isDarkMode,
        theme: isDarkMode ? 'dark' : 'light',
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
