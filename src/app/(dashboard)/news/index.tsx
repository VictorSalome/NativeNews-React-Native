import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsCard } from "@/components/NewsCard";
import { NewsHeader } from "@/components/NewsHeader";
import { NewsSearchBar } from "@/components/NewsSearchBar";
import { useThemeContext } from "@/context/themeContext";

import { LoadingIndicator } from "@/components/LoadingIndicator";
import { NewsEmpty } from "@/components/NewsEmpty";
import type { IArticle } from "@/hooks/api/news/useNews/types";
import { useNewsQuery } from "@/hooks/api/news/useNewsQuery";
import { useNewsSearchQuery } from "@/hooks/api/news/useNewsSearchQuery";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  { id: "geral", name: "Geral" },
  { id: "tecnologia", name: "Tecnologia" },
  { id: "esportes", name: "Esportes" },
  { id: "mundo", name: "Mundo" },
];

export default function News() {
  const { isDarkMode } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("geral");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [actualSearchTerm, setActualSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const selectorFilter = useMemo<Record<string, string>>(
    () => ({
      geral: "general",
      tecnologia: "technology",
      esportes: "sports",
      mundo: "world",
    }),
    [selectedCategory],
  );

  const categoryTags = useMemo(
    () => selectorFilter[selectedCategory],
    [selectedCategory, selectorFilter],
  );

  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
    refetch: fetchNews,
  } = useNewsQuery(categoryTags);

  const {
    data: searchResults,
    isLoading: searchLoading,
    error: searchError,
  } = useNewsSearchQuery(actualSearchTerm);

  const handleSearch = () => {
    if (searchQuery.length >= 3) {
      setActualSearchTerm(searchQuery);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  }, [fetchNews]);

  const handleArticlePress = (article: IArticle) => {
    console.log("Navegando para artigo:", article);
  };

  const displayData =
    actualSearchTerm.length >= 3 ? searchResults?.articles : news?.articles;

  if (newsError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Erro ao carregar notícias</Text>
      </View>
    );
  }

  if (searchError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Erro ao buscar notícias</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <View className="bg-surface dark:bg-surface-dark px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <NewsHeader
          onPress={() => router.back()}
          isDarkMode={isDarkMode}
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      </View>

      {showSearchBar ? (
        <View className="bg-surface dark:bg-surface-dark px-4 pb-3">
          <NewsSearchBar
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
            showSearchBar={showSearchBar}
            setSearchQuery={setSearchQuery}
            setActualSearchTerm={setActualSearchTerm}
            onSearch={handleSearch}
          />
        </View>
      ) : null}

      <View className="bg-surface dark:bg-surface-dark px-4 py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <CategoryFilter
            categories={categories}
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </ScrollView>
      </View>

      {newsLoading || searchLoading ? (
        <LoadingIndicator color="#4FA6BB" size={"large"} />
      ) : (
        <FlatList
          data={displayData}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              isDarkMode={isDarkMode}
              handleArticlePress={(article: IArticle) =>
                handleArticlePress(article)
              }
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item) => item.url}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4FA6BB"]}
              tintColor={"#4FA6BB"}
            />
          }
          ListEmptyComponent={
            <NewsEmpty searchQuery={searchQuery} isDarkMode={isDarkMode} />
          }
        />
      )}
    </SafeAreaView>
  );
}
