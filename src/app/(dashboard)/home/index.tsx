import React, { useState } from "react";

import { ErrorState } from "@/components/ErrorState";
import { HomeHeader } from "@/components/HomeHeader";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { NewsHorizontalList } from "@/components/NewsHorizontalList";
import { ViewAllNewsButton } from "@/components/ViewAllNewsButton";
import { WeatherCard } from "@/components/WeatherCard";
import { DashboardTexts } from "@/constants/texts/dashboard";
import { useNewsBySearch } from "@/hooks/api/news/useNewsBySearch";
import { useWeatherCurrent } from "@/hooks/api/weather/useWeatherCurrent";
import useLocation from "@/hooks/useLocation";
import { AppRoutes } from "@/routes/appRoutes";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Button,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
    refetch: fetchNews,
  } = useNewsBySearch("Brasil");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { label, latestNews, noNews, viewAll, loadingNews } =
    DashboardTexts.Home;

  const { location, errorMsg, loading, getCurrentLocation } = useLocation();

  const { data: weatherData } = useWeatherCurrent(
    location?.latitude!,
    location?.longitude!,
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-2">Obtendo localização...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 mb-4">{errorMsg}</Text>
        <Button title="Tentar Novamente" onPress={getCurrentLocation} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <HomeHeader label={label} />

      {/* <View className="p-4">
        <Text className="text-lg font-bold mb-2">Sua Localização:</Text>
        <Text>Latitude: {location?.latitude}</Text>
        <Text>Longitude: {location?.longitude}</Text>
        <Text>Precisão: {location?.accuracy}m</Text>
        <Button title="Atualizar Localização" onPress={getCurrentLocation} />
      </View> */}

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
        <View className="mb-6">
          <WeatherCard
            weatherData={weatherData}
            onPress={() => router.navigate(AppRoutes.Weather)}
          />
        </View>

        <View className="mb-6">
          <Text className="text-xl font-bold text-text-base dark:text-text-base-dark mb-4">
            {latestNews}
          </Text>

          {newsError ? (
            <ErrorState noNews={noNews} newsError={newsError} />
          ) : null}

          {newsLoading ? (
            <LoadingIndicator
              color="#3B82F6"
              label={loadingNews}
              size={"large"}
            />
          ) : (
            <View className="w-full">
              <NewsHorizontalList
                articles={news?.articles}
                onArticlePress={(item) => router.navigate(AppRoutes.News)}
              />
            </View>
          )}
        </View>

        <View className="pt-4 pb-6">
          <ViewAllNewsButton viewAll={viewAll} pathName={AppRoutes.News} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
