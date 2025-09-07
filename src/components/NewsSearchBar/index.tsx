import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";
import type { INewsSearchBarProps } from "./types";

export const NewsSearchBar = ({
  isDarkMode,
  searchQuery,
  showSearchBar,
  setSearchQuery,
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
  );
};
