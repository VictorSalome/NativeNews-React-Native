import React from "react";

import { ScrollView, View } from "react-native";

import { NewsCardHome } from "../NewsCardHome";
import type { INewsHorizontalListProps } from "./types";

export const NewsHorizontalList = ({
  articles,
  onArticlePress,
}: INewsHorizontalListProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 4 }}
    >
      <View className="flex-row gap-4">
        {articles?.map((item) => (
          <NewsCardHome
            key={item?.url}
            article={item}
            onPress={() => onArticlePress?.(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};
