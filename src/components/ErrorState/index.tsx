import { Text, View } from "react-native";

import type { IErrorStateProps } from "./types";

export const ErrorState = ({ newsError, noNews }: IErrorStateProps) => {
  return (
    <View className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
      <Text className="text-red-800 dark:text-red-200 font-medium">
        {noNews}
      </Text>
      <Text className="text-red-600 dark:text-red-300 text-sm mt-1">
        {newsError?.message}
      </Text>
    </View>
  );
};
