import { useThemeContext } from "@/context/themeContext";
import useAuth from "@/hooks/useAuth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileUser() {
  const router = useRouter();
  const { logout } = useAuth();
  const { toggleTheme, isDarkMode } = useThemeContext();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/sign-in");
    alert("User logged out successfully");
  };

  return (
    <View className="flex-1 bg-surface dark:bg-surface-dark">
      <View className="flex-row items-center p-4 border-b border-border dark:border-border-dark">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4 text-text-base dark:text-text-base-dark">Profile</Text>
      </View>

      <View className="items-center p-5">
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          className="w-30 h-30 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold mb-2 text-text-base dark:text-text-base-dark">John Doe</Text>
        <Text className="text-base text-text-muted dark:text-text-muted-dark">john.doe@example.com</Text>
      </View>

      <View className="p-5">
        <TouchableOpacity className="flex-row items-center py-4 border-b border-border dark:border-border-dark">
          <Ionicons name="person-outline" size={24} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          <Text className="text-base ml-4 text-text-base dark:text-text-base-dark">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-4 border-b border-border dark:border-border-dark">
          <Ionicons name="settings-outline" size={24} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          <Text className="text-base ml-4 text-text-base dark:text-text-base-dark">Settings</Text>
        </TouchableOpacity>
        //botao que troca a cor do theme
        <TouchableOpacity
          className="flex-row items-center py-4 border-b border-border dark:border-border-dark"
          onPress={toggleTheme}
        >
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#000000'}
          />
          <Text className="text-base ml-4 text-text-base dark:text-text-base-dark">Change Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center py-4 border-b border-border dark:border-border-dark">
          <Ionicons name="help-circle-outline" size={24} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
          <Text className="text-base ml-4 text-text-base dark:text-text-base-dark">Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center py-4 mt-5"
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={isDarkMode ? '#EF4444' : '#DC2626'} />
          <Text className="text-base ml-4 text-error dark:text-error-dark">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
