import { getGreeting } from "@/app/(dashboard)/home/mockData";
import { AppRoutes } from "@/routes/appRoutes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { LogoSvg } from "../LogoSvg";
import { IHomeHeaderProps } from "./types";

export const HomeHeader = ({ label }: IHomeHeaderProps) => {
  return (
    <View className="px-4 py-3 bg-background dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-dark/10 items-center justify-center">
            <LogoSvg width={24} height={24} isDark={false} />
          </View>
          <View>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {getGreeting()}
            </Text>
            <Text className="text-lg font-bold text-text-base dark:text-text-base-dark">
              {label}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center"
            onPress={() => {
              console.log("Notificações");
            }}
            accessibilityLabel="Notificações"
          >
            <Ionicons name="notifications-outline" size={20} color="#6B7280" />

            <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-primary dark:bg-primary-dark items-center justify-center"
            onPress={() => router.navigate(AppRoutes.ProfileUser || "/profile")}
            accessibilityLabel="Perfil do usuário"
          >
            <Ionicons name="person" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
