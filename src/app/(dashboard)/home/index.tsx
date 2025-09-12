import { NewsHorizontalList } from "@/components/NewsHorizontalList";
import { WeatherCard } from "@/components/WeatherCard";

import { ErrorState } from "@/components/ErrorState";
import { HomeHeader } from "@/components/HomeHeader";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ViewAllNewsButton } from "@/components/ViewAllNewsButton";
import { DashboardTexts } from "@/constants/texts/dashboard";
import { useNewsQuery } from "@/hooks/api/news/useNewsQuery";
import { AppRoutes } from "@/routes/appRoutes";
import { router } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
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

  const { label, latestNews, noNews, viewAll, loadingNews } =
    DashboardTexts.Home;

  return (
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
              setIsRefreshing(false);
            }}
            colors={["#3B82F6"]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
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
