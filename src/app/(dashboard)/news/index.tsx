import { LogoSvg } from "@/components/LogoSvg";
import { useThemeContext } from "@/context/themeContext";
import { AppRoutes } from "@/routes/appRoutes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Categorias de notícias
const categories = [
  { id: "geral", name: "Geral", active: true },
  { id: "tecnologia", name: "Tecnologia", active: false },
  { id: "esportes", name: "Esportes", active: false },
  { id: "mundo", name: "Mundo", active: false },
  { id: "negocios", name: "Negócios", active: false },
  { id: "saude", name: "Saúde", active: false },
];

// Dados mockados de notícias (futuramente virão de uma API)
const newsMock = [
  {
    id: "1",
    title: "SpaceX launches new rocket mission to Mars",
    source: "BBC Brasil",
    time: "5 min atrás",
    image: "https://picsum.photos/seed/space1/300/200",
    category: "tecnologia",
    isRead: false,
  },
  {
    id: "2",
    title: "SpaceX launches new rocket mission to explore deep space",
    source: "BBC Brasil",
    time: "4 min atrás",
    image: "https://picsum.photos/seed/space2/300/200",
    category: "tecnologia",
    isRead: false,
  },
  {
    id: "3",
    title: "Local team wins championship in final match",
    source: "BBC Brasil",
    time: "3 min atrás",
    image: "https://picsum.photos/seed/sports1/300/200",
    category: "esportes",
    isRead: true,
  },
  {
    id: "4",
    title: "Local team wins championship after intense competition",
    source: "BBC Brasil",
    time: "1 min atrás",
    image: "https://picsum.photos/seed/sports2/300/200",
    category: "esportes",
    isRead: false,
  },
  {
    id: "5",
    title:
      "New programming: New programming languages revolutionize development",
    source: "BBC Brasil",
    time: "5 min atrás",
    image: "https://picsum.photos/seed/tech1/300/200",
    category: "tecnologia",
    isRead: false,
  },
  {
    id: "6",
    title: "Global economy shows signs of recovery in Q3 2024",
    source: "Reuters",
    time: "8 min atrás",
    image: "https://picsum.photos/seed/economy1/300/200",
    category: "negocios",
    isRead: false,
  },
  {
    id: "7",
    title: "Climate change summit reaches historic agreement",
    source: "CNN Brasil",
    time: "12 min atrás",
    image: "https://picsum.photos/seed/climate1/300/200",
    category: "mundo",
    isRead: true,
  },
  {
    id: "8",
    title: "Breakthrough in cancer research offers new hope",
    source: "Folha de S.Paulo",
    time: "15 min atrás",
    image: "https://picsum.photos/seed/health1/300/200",
    category: "saude",
    isRead: false,
  },
];

export default function News() {
  const { isDarkMode } = useThemeContext();
  const [selectedCategory, setSelectedCategory] = useState("geral");
  const [refreshing, setRefreshing] = useState(false);
  const [readArticles, setReadArticles] = useState<string[]>([]);
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

  // Função para marcar artigo como lido
  const markAsRead = (articleId: string) => {
    if (!readArticles.includes(articleId)) {
      setReadArticles([...readArticles, articleId]);
    }
  };

  // Função para navegar para o artigo completo
  const handleArticlePress = (article: any) => {
    markAsRead(article.id);
    // Aqui você navegaria para a tela de detalhes do artigo
    console.log("Navegando para artigo:", article.title);
  };

  // Componente do header
  const renderHeader = () => (
    <View className="bg-surface dark:bg-surface-dark px-4 py-4 border-b border-gray-200 dark:border-gray-800">
      <View className="flex-row items-center justify-between">
        {/* Título Centralizado */}
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-text-base dark:text-text-base-dark">
            Notícias
          </Text>
        </View>

        {/* Ícone de Busca */}
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center ml-4"
          onPress={() => setShowSearchBar(!showSearchBar)}
          accessibilityLabel="Pesquisar notícias"
        >
          <Ionicons
            name={showSearchBar ? "close" : "search"}
            size={20}
            color={isDarkMode ? "#9CA3AF" : "#6B7280"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Componente da barra de busca
  const renderSearchBar = () => {
    if (!showSearchBar) return null;

    return (
      <View className="bg-surface dark:bg-surface-dark px-4 pb-3">
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
          <Ionicons
            name="search"
            size={18}
            color={isDarkMode ? "#9CA3AF" : "#6B7280"}
            style={{ marginRight: 8 }}
          />
          <TextInput
            className="flex-1 text-base text-text-base dark:text-text-base-dark"
            placeholder="Buscar notícias..."
            placeholderTextColor={isDarkMode ? "#9CA3AF" : "#6B7280"}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={showSearchBar}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              className="ml-2 p-1"
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  // Componente dos filtros de categoria
  const renderCategoryFilters = () => (
    <View className="bg-surface dark:bg-surface-dark px-4 py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        <View className="flex-row gap-3">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                className={`px-4 py-2 rounded-full border ${
                  isActive
                    ? "bg-primary dark:bg-primary-dark border-primary dark:border-primary-dark"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <Text
                  className={`font-medium ${
                    isActive
                      ? "text-white"
                      : "text-text-base dark:text-text-base-dark"
                  }`}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  // Componente do card de notícia
  const renderNewsCard = ({ item }: { item: any }) => {
    const isRead = readArticles.includes(item.id) || item.isRead;

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
                className={`flex-1 text-base font-bold leading-5 mr-2 ${
                  isRead
                    ? "text-text-muted dark:text-text-muted-dark"
                    : "text-text-base dark:text-text-base-dark"
                }`}
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

            {/* Fonte e tempo */}
            <Text className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
              {item.source} • {item.time}
            </Text>

            {/* Indicador de lido */}
            {isRead && (
              <View className="flex-row items-center mt-2">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Lido
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {/* Header */}
      {renderHeader()}

      {/* Barra de Busca */}
      {renderSearchBar()}

      {/* Filtros de Categoria */}
      {renderCategoryFilters()}

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
