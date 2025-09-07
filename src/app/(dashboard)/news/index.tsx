import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsCard } from "@/components/NewsCard";
import { NewsHeader } from "@/components/NewsHeader";
import { NewsSearchBar } from "@/components/NewsSearchBar";
import { useThemeContext } from "@/context/themeContext";

import { NewsEmpty } from "@/components/NewsEmpty";
import type { IArticle } from "@/hooks/api/news/useNews/types";
import { useNewsQuery } from "@/hooks/api/news/useNewsQuery";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNewsSearchQuery } from "@/hooks/api/news/useNewsSearchQuery";

const categories = [
  { id: "geral", name: "Geral", active: true },
  { id: "tecnologia", name: "Tecnologia", active: false },
  { id: "esportes", name: "Esportes", active: false },
  { id: "mundo", name: "Mundo", active: false },
];

export default function News() {
  const { isDarkMode } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("geral");
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const selectorFilter: Record<string, string> = {
    geral: "general",
    tecnologia: "technology",
    esportes: "sports",
    mundo: "world",
  };

  const categoryTags = selectorFilter[selectedCategory] || "general";

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
  } = useNewsSearchQuery(searchQuery);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  }, [fetchNews]);

  const handleArticlePress = (article: string) => {
    // Aqui você navegaria para a tela de detalhes do artigo
    console.log("Navegando para artigo:", article);
  };

  // Determinar quais dados mostrar
  const displayData =
    searchQuery.length >= 3 ? searchResults?.articles : news?.articles;

  const isLoading = searchQuery.length >= 3 ? searchLoading : newsLoading;

  const hasError = searchQuery.length >= 3 ? searchError : newsError;

  if (newsLoading && !refreshing) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4FA6BB" />
      </View>
    );
  }

  if (newsError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Erro ao carregar notícias</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {/* Header */}
      <View className="bg-surface dark:bg-surface-dark px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <NewsHeader
          onPress={() => router.back()}
          isDarkMode={isDarkMode}
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
        />
      </View>

      {/* Barra de Busca */}
      {showSearchBar ? (
        <View className="bg-surface dark:bg-surface-dark px-4 pb-3">
          <NewsSearchBar
            isDarkMode={isDarkMode}
            searchQuery={searchQuery}
            showSearchBar={showSearchBar}
            setSearchQuery={setSearchQuery}
          />
        </View>
      ) : null}

      {/* Filtros de Categoria */}
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

      {/* Lista de Notícias */}
      <FlatList
        data={displayData}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            isDarkMode={isDarkMode}
            handleArticlePress={(article: IArticle) =>
              handleArticlePress(article.url)
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
    </SafeAreaView>
  );
}
