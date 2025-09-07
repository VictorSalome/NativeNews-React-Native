import { convertDateToBr } from "@/utils/convertDateToBr";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { INewsCardHomeProps } from "./types";

export const NewsCardHome = ({ article, onPress }: INewsCardHomeProps) => {
  return (
    <TouchableOpacity
      key={article?.url ?? Math.random().toString()}
      className="w-80 bg-surface dark:bg-surface-dark rounded-2xl overflow-hidden border border-border dark:border-border-dark"
      activeOpacity={0.95}
      onPress={onPress}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <Image
        source={article?.urlToImage ? { uri: article.urlToImage } : undefined}
        className="w-full h-32"
        resizeMode="cover"
        onError={(e) => console.log("Image error:", e.nativeEvent.error)}
      />
      <View className="p-4">
        <Text
          className="text-base font-bold text-text-base dark:text-text-base-dark leading-5"
          numberOfLines={2}
        >
          {article?.description}
        </Text>
        <Text className="text-xs text-text-muted dark:text-text-muted-dark mt-2 font-medium">
          Fonte: {article?.source?.name} •{" "}
          {convertDateToBr(article?.publishedAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
