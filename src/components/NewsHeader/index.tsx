import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import type { INewsHeaderProps } from "./types";

export const NewsHeader = ({
  onPress,
  isDarkMode,
  showSearchBar,
  setShowSearchBar,
}: INewsHeaderProps) => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1 flex-row items-center gap-3">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-surface dark:bg-surface-dark items-center justify-center ml-4"
          onPress={onPress}
          accessibilityLabel="Voltar"
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={isDarkMode ? "#9CA3AF" : "#6B7280"}
          />
        </TouchableOpacity>
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
  );
};
