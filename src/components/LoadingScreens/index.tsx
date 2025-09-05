import { ActivityIndicator, View } from "react-native";

export const LoadingScreens = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};
