import React from "react";

import { Text, TouchableOpacity, View } from "react-native";

import type { ICategoryFilterProps } from "./types";

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: ICategoryFilterProps) => {
  return (
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
            onPress={() => onCategorySelect(category.id)}
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
  );
};
