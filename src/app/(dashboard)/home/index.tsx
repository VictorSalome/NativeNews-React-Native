import { NewsHorizontalList } from "@/components/NewsHorizontalList";
import { WeatherCard } from "@/components/WeatherCard";
import { useNewsAll } from "@/hooks/api/news/useNewsAll";
import { AppRoutes } from "@/routes/appRoutes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dados mockados (futuramente virão de uma API)
const weatherMock = {
  condition: "sunny" as "sunny" | "cloudy" | "rain" | "night",
  temperature: 24,
  feelsLike: 26,
  humidity: 60,
  wind: 15,
};

type WeatherCondition = "sunny" | "cloudy" | "rain" | "night";

export const useWeatherGradient = (condition: WeatherCondition) => {
  return useMemo(() => {
    switch (condition) {
      case "rain":
        return ["#4F6D7A", "#C0D6DF"];
      case "cloudy":
        return ["#8BA4B1", "#E1EBF0"];
      case "night":
        return ["#0F2027", "#203A43"];
      case "sunny":
      default:
        return ["#9DD4F6", "#F7D4A9"];
    }
  }, [condition]);
};

export default function Home() {
  const { newsAll, newsLoading, newsError, fetchAllNews } = useNewsAll();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Seção de Clima */}
        <WeatherCard
          condition={useWeatherGradient(weatherMock.condition)}
          temperature={weatherMock.temperature}
          feelsLike={weatherMock.feelsLike}
          humidity={weatherMock.humidity}
          wind={weatherMock.wind}
          onPress={() => router.navigate(AppRoutes.Weather)}
        />

        {/* Feed de Notícias */}
        <Text className="text-xl font-bold text-text-base dark:text-text-base-dark mb-4">
          Featured News
        </Text>
        <NewsHorizontalList
          articles={newsAll?.articles}
          onArticlePress={(item) => router.navigate(AppRoutes.News, { item })}
        />

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
