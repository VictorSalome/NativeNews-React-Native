import { convertDateToBr } from "@/utils/convertDateToBr";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

import type { INewsCardProps } from "./types";

export const NewsCard = ({
  handleArticlePress,
  article,
  isDarkMode,
}: INewsCardProps) => {
  return (
    <TouchableOpacity
      className="bg-surface dark:bg-surface-dark mx-4 mb-4 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
      onPress={() => handleArticlePress(article)}
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
            source={
              article?.urlToImage ? { uri: article.urlToImage } : undefined
            }
            className="w-full h-full"
            resizeMode="cover"
            onError={(e) => {
              console.error("Image error:", e.nativeEvent.error);
            }}
          />
        </View>

        {/* Conteúdo da notícia */}
        <View className="flex-1 p-4">
          <View className="flex-row items-start justify-between mb-2">
            <Text
              className="flex-1 text-base font-bold leading-5 mr-2"
              numberOfLines={2}
            >
              {article.description}
            </Text>

            {/* Indicador de favorito */}
            <TouchableOpacity
              className="ml-2 p-1"
              onPress={() => {
                console.error("Favoritar:", article.url);
              }}
            >
              <MaterialIcons
                name="favorite-border"
                size={16}
                color={isDarkMode ? "#9CA3AF" : "#6B7280"}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-text-muted dark:text-text-muted-dark font-medium">
            Fonte: {article?.source?.name} •{" "}
            {convertDateToBr(article?.publishedAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
