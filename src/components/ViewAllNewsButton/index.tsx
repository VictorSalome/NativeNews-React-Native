import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import type { IViewAllNewsButtonProps } from "./types";

export const ViewAllNewsButton = ({
  viewAll,
  pathName,
}: IViewAllNewsButtonProps) => {
  return (
    <TouchableOpacity
      className="self-center px-8 py-4 rounded-full bg-primary dark:bg-primary-dark min-w-[70%]"
      onPress={() => router.navigate(pathName as any)}
      activeOpacity={0.8}
      style={{
        shadowColor: "#3B82F6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-white font-bold text-base">{viewAll}</Text>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
};
