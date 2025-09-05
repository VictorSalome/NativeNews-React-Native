import { LogoSvg } from "@/components/LogoSvg";
import { useThemeContext } from "@/context/themeContext";
import { AppRoutes } from "@/routes/appRoutes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dados mockados (futuramente virão de uma API)
const weatherMock = {
  condition: "sunny" as "sunny" | "cloudy" | "rain" | "night",
  temperature: 24,
  feelsLike: 26,
  humidity: 60,
  wind: 15,
};

const newsMock = [
  {
    id: "1",
    title: "NASA launches new probe to study asteroid",
    source: "G1",
    time: "5 min atrás",
    image: "https://picsum.photos/seed/1/200/120",
  },
  {
    id: "2",
    title: "Brazilian team wins championship final",
    source: "UOL Esporte",
    time: "10 min atrás",
    image: "https://picsum.photos/seed/2/200/120",
  },
  {
    id: "3",
    title: "Technology: New programming languages gaining ground",
    source: "TechCrunch",
    time: "15 min atrás",
    image: "https://picsum.photos/seed/3/200/120",
  },
  {
    id: "4",
    title: "Economy shows signs of recovery in Q3",
    source: "Reuters",
    time: "20 min atrás",
    image: "https://picsum.photos/seed/4/200/120",
  },
];

function useWeatherGradient(condition: typeof weatherMock.condition) {
  return useMemo(() => {
    switch (condition) {
      case "rain":
        return ["#4F6D7A", "#C0D6DF"]; // azul chuvoso
      case "cloudy":
        return ["#8BA4B1", "#E1EBF0"]; // nublado
      case "night":
        return ["#0F2027", "#203A43"]; // noite
      case "sunny":
      default:
        return ["#9DD4F6", "#F7D4A9"];
    }
  }, [condition]);
}

export default function Home() {
  const { isDarkMode } = useThemeContext();

  const dateText = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }, []);

  const locationText = "São Paulo, SP";

  const gradient = useWeatherGradient(weatherMock.condition);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6 px-1">
          {/* Lado Esquerdo: Data e Localização */}
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Ionicons
                name="calendar-outline"
                size={16}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
              <Text className="text-sm font-medium text-text-base dark:text-text-base-dark ml-2 capitalize">
                {dateText}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name="location-outline"
                size={14}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
              <Text className="text-xs text-text-muted dark:text-text-muted-dark ml-1">
                {locationText}
              </Text>
            </View>
          </View>

          {/* Lado Direito: Logo e Avatar */}
          <View className="flex-row items-center gap-3">
            <LogoSvg width={24} height={24} isDark={isDarkMode} />
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-dark/10 items-center justify-center border border-primary/20 dark:border-primary-dark/20"
              onPress={() => router.navigate(AppRoutes.ProfileUser)}
              accessibilityLabel="Abrir perfil"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <AntDesign
                name="user"
                size={18}
                color={isDarkMode ? "#60A5FA" : "#3B82F6"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de Clima */}
        <LinearGradient
          colors={gradient}
          className="rounded-2xl p-6 mb-6"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
            borderRadius: 24,
          }}
        >
          <View className="items-center mb-4">
            <Ionicons name="sunny" size={56} color="#F6C453" />
          </View>
          <Text className="text-6xl font-black text-center text-black/90 mb-4">
            {weatherMock.temperature}°C
          </Text>
          <View className="items-center gap-3 mb-6">
            <View className="flex-row items-center gap-2">
              <Ionicons name="thermometer-outline" size={16} color="#374151" />
              <Text className="text-sm text-black/75 font-medium">
                Feels like: {weatherMock.feelsLike}°C
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="water-outline" size={16} color="#374151" />
              <Text className="text-sm text-black/75 font-medium">
                Humidity: {weatherMock.humidity}%
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MaterialCommunityIcons
                name="weather-windy"
                size={16}
                color="#374151"
              />
              <Text className="text-sm text-black/75 font-medium">
                Wind: {weatherMock.wind} km/h
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.navigate(AppRoutes.Weather)}
            className="items-center py-2 px-4 rounded-full bg-white/20 self-center"
            activeOpacity={0.8}
          >
            <Text className="text-sm font-bold text-[#1E40AF]">
              View detailed weather
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Feed de Notícias */}
        <Text className="text-xl font-bold text-text-base dark:text-text-base-dark mb-4">
          Featured News
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          <View className="flex-row gap-4">
            {newsMock.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-80 bg-surface dark:bg-surface-dark rounded-2xl overflow-hidden border border-border dark:border-border-dark"
                activeOpacity={0.95}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-32"
                  resizeMode="cover"
                  onError={(e) =>
                    console.log("Image error:", e.nativeEvent.error)
                  }
                />
                <View className="p-4">
                  <Text
                    className="text-base font-bold text-text-base dark:text-text-base-dark leading-5"
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                  <Text className="text-xs text-text-muted dark:text-text-muted-dark mt-2 font-medium">
                    Source: {item.source} • {item.time}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* CTA para todas as notícias */}
        <TouchableOpacity
          className="mt-6 self-center px-8 py-4 rounded-full bg-primary dark:bg-primary-dark min-w-[60%]"
          onPress={() => router.navigate(AppRoutes.Home)}
          activeOpacity={0.9}
          style={{
            shadowColor: "#3B82F6",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-white font-bold text-base">See all news</Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Espaço inferior para não colar na tab bar */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
