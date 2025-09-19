import React, { useState } from "react";

import { ErrorState } from "@/components/ErrorState";
import { HomeHeader } from "@/components/HomeHeader";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { NewsHorizontalList } from "@/components/NewsHorizontalList";
import { ViewAllNewsButton } from "@/components/ViewAllNewsButton";
import { WeatherCard } from "@/components/WeatherCard";
import { DashboardTexts } from "@/constants/texts/dashboard/dashboardTexts";
import { useNewsBySearch } from "@/hooks/api/news/useNewsBySearch";
import { useWeatherCurrent } from "@/hooks/api/weather/useWeatherCurrent";
import useLocation from "@/hooks/useLocation";
import { AppRoutes } from "@/routes/appRoutes";
import { router } from "expo-router";
import {
  ActivityIndicator,
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

  const {
    location,
    getCurrentLocation,
    loading: locationLoading,
  } = useLocation();

  const { latitude, longitude } = location || {};

  const { data: weatherData, isLoading: weatherLoading } = useWeatherCurrent(
    latitude!,
    longitude!,
  );

  const isLoadingMain = locationLoading || newsLoading || weatherLoading;

  return isLoadingMain ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  ) : (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <HomeHeader label={label} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);
              await fetchNews();
              await getCurrentLocation();
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
