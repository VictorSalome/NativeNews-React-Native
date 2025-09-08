import { NewsHorizontalList } from "@/components/NewsHorizontalList";
import { WeatherCard } from "@/components/WeatherCard";

import { useNewsQuery } from "@/hooks/api/news/useNewsQuery";
import { AppRoutes } from "@/routes/appRoutes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { weatherMock } from "./mockData";

export default function Home() {
  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
    refetch: fetchNews,
  } = useNewsQuery("Brasil");
  const { condition, temperature, feelsLike, humidity, wind } = weatherMock;
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);
              await fetchNews();
              setIsRefreshing(false);
            }}
            colors={["#3B82F6"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Weather Card Section */}
        <View className="mb-6">
          <WeatherCard
            condition={condition}
            temperature={temperature}
            feelsLike={feelsLike}
            humidity={humidity}
            wind={wind}
            onPress={() => router.navigate(AppRoutes.Weather)}
          />
        </View>

        {/* News Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-text-base dark:text-text-base-dark mb-4">
            Últimas notícias
          </Text>

          {newsError ? (
            <View className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
              <Text className="text-red-800 dark:text-red-200 font-medium">
                Erro ao carregar notícias
              </Text>
              <Text className="text-red-600 dark:text-red-300 text-sm mt-1">
                {newsError.message}
              </Text>
              <TouchableOpacity
                onPress={() => fetchNews()}
                className="mt-3 bg-red-600 px-4 py-2 rounded-lg self-start"
              >
                <Text className="text-white text-center font-medium">Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {newsLoading ? (
            <View className="py-12 justify-center items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="mt-3 text-gray-600 dark:text-gray-400">Carregando notícias...</Text>
            </View>
          ) : (
            <View className="w-full">
              <NewsHorizontalList
                articles={news?.articles}
                onArticlePress={(item) => router.navigate(AppRoutes.News)}
              />
            </View>
          )}
        </View>

        {/* Action Button Section */}
        <View className="pt-4 pb-6">
          <TouchableOpacity
            className="self-center px-8 py-4 rounded-full bg-primary dark:bg-primary-dark min-w-[70%]"
            onPress={() => router.navigate(AppRoutes.News)}
            activeOpacity={0.8}
            style={{
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <View className="flex-row items-center justify-center gap-2">
              <Text className="text-white font-bold text-base">
                Ver todas as notícias
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
