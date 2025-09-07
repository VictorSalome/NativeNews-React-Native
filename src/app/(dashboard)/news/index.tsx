import { CategoryFilter } from "@/components/CategoryFilter";
import { NewsHeader } from "@/components/NewsHeader";
import { NewsSearchBar } from "@/components/NewsSearchBar";
import { useThemeContext } from "@/context/themeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, newsMock } from "./mockDataNews";

export default function News() {
  const { isDarkMode } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("geral");
  const [refreshing, setRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Função para filtrar notícias por categoria e busca
  const filteredNews = newsMock.filter((news) => {
    const matchesCategory =
      selectedCategory === "geral" || news.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Função para atualizar a lista
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simula uma requisição à API
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Função para navegar para o artigo completo
  const handleArticlePress = (article: any) => {
    // Aqui você navegaria para a tela de detalhes do artigo
    console.log("Navegando para artigo:", article.title);
  };

  // Componente do card de notícia
  const renderNewsCard = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        className="bg-surface dark:bg-surface-dark mx-4 mb-4 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
        onPress={() => handleArticlePress(item)}
        activeOpacity={0.9}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <View className="flex-row">
          {/* Imagem da notícia */}
          <View className="w-24 h-24 bg-gray-200 dark:bg-gray-700">
            <Image
              source={{ uri: item.image }}
              className="w-full h-full"
              resizeMode="cover"
              onError={(e) => console.log("Image error:", e.nativeEvent.error)}
            />
          </View>

          {/* Conteúdo da notícia */}
          <View className="flex-1 p-4">
            <View className="flex-row items-start justify-between mb-2">
              <Text
                className="flex-1 text-base font-bold leading-5 mr-2"
                numberOfLines={2}
              >
                {item.title}
              </Text>

              {/* Indicador de favorito */}
              <TouchableOpacity
                className="ml-2 p-1"
                onPress={() => console.log("Favoritar:", item.id)}
              >
                <MaterialIcons
                  name="favorite-border"
                  size={16}
                  color={isDarkMode ? "#9CA3AF" : "#6B7280"}
                />
              </TouchableOpacity>
            </View>

            <Text className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
              {item.source} • {item.time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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
        data={filteredNews}
        renderItem={renderNewsCard}
        keyExtractor={(item) => item.id}
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
