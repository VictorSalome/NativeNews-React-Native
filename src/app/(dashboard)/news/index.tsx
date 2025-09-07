import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsCard } from "@/components/NewsCard";
import { NewsHeader } from "@/components/NewsHeader";
import { NewsSearchBar } from "@/components/NewsSearchBar";
import { useThemeContext } from "@/context/themeContext";
import { useNewsQuery } from "@/hooks/api/news/useNewsQuery";

import type { IArticle } from "@/hooks/api/news/useNews/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories } from "./mockDataNews";

export default function News() {
  const { isDarkMode } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("geral");
  console.log("selectedCategory", selectedCategory);
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  interface ISelectorFilter {
    general: string;
    technology: string;
    sports: string;
    world: string;
  }

  const selectorFilter: Record<string, string> = {
    geral: "general",
    tecnologia: "technology",
    esportes: "sports",
    mundo: "world",
  };

  const categoryInEnglish = selectorFilter[selectedCategory] || "general";

  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
    refetch: fetchNews,
  } = useNewsQuery(categoryInEnglish);
  // de acordo com o seletor tem que fazer uma requisição diferente
  // se for geral tem que fazer uma requisição com a chave general
  // se for tecnologia tem que fazer uma requisição com a chave technology
  // se for esportes tem que fazer uma requisição com a chave sports
  // se for mundo tem que fazer uma requisição com a chave world

  const handleCategorySelect = (category: string) => {
    console.log(category);
    setSelectedCategory(category);
  };

  // Função para filtrar notícias por categoria e busca
  // const filteredNews = newsMock.filter((news) => {
  //   const matchesCategory =
  //     selectedCategory === "geral" || news.category === selectedCategory;
  //   const matchesSearch =
  //     searchQuery === "" ||
  //     news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     news.source.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  // Função para atualizar a lista
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simula uma requisição à API
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Função para navegar para o artigo completo
  const handleArticlePress = (article: string) => {
    // Aqui você navegaria para a tela de detalhes do artigo
    console.log("Navegando para artigo:", article);
  };

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
        // data={filteredNews}
        data={news?.articles}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            isDarkMode={isDarkMode}
            handleArticlePress={(article: IArticle) =>
              handleArticlePress(article.url)
            }
          />
        )}
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
          <View className="items-center justify-center py-20">
            <Ionicons
              name="newspaper-outline"
              size={64}
              color={isDarkMode ? "#6B7280" : "#9CA3AF"}
            />
            <Text className="text-text-muted dark:text-text-muted-dark text-lg font-medium mt-4">
              {searchQuery
                ? "Nenhum resultado encontrado"
                : "Nenhuma notícia encontrada"}
            </Text>
            <Text className="text-text-muted dark:text-text-muted-dark text-sm mt-2 text-center px-8">
              {searchQuery
                ? `Não encontramos notícias para "${searchQuery}"`
                : "Tente selecionar uma categoria diferente ou atualize a página"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
