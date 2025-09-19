import { ActivityIndicator, Text, View } from "react-native";

import { ILoadingIndicatorProps } from "./types";

export const LoadingIndicator = ({
  size,
  color,
  label,
}: ILoadingIndicatorProps) => {
  return (
    <View className="py-12 justify-center items-center">
      <ActivityIndicator size={size} color={color} />
      <Text className="mt-3 text-gray-600 dark:text-gray-400">{label}</Text>
    </View>
  );
};
