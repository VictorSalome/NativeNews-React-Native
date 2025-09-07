import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import type { INewsEmptyProps } from "./types";

export const NewsEmpty = ({ searchQuery, isDarkMode }: INewsEmptyProps) => {
  return (
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
  );
};
