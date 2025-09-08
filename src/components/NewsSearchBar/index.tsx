import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import type { INewsSearchBarProps } from "./types";

export const NewsSearchBar = ({
  isDarkMode,
  searchQuery,
  showSearchBar,
  setSearchQuery,
  onSearch,
  setActualSearchTerm,
}: INewsSearchBarProps) => {
  return (
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
        onSubmitEditing={onSearch} // Busca ao pressionar Enter
        returnKeyType="search" // Muda botão para "Buscar"
        autoFocus={showSearchBar}
      />
      {/* Botão de busca manual */}
      {searchQuery.length >= 3 && (
        <TouchableOpacity onPress={onSearch} className="ml-2 p-1">
          <Ionicons
            name="search"
            size={18}
            color={isDarkMode ? "#4FA6BB" : "#4FA6BB"}
          />
        </TouchableOpacity>
      )}
      {/* Botão limpar */}
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            setSearchQuery("");
            setActualSearchTerm("");
          }}
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
  );
};
