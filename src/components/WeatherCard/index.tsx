import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import type { IWeatherCardProps } from "./types";
import { useWeatherGradient } from "@/app/(dashboard)/home/mockData";

export const WeatherCard = ({
  condition,
  temperature,
  feelsLike,
  humidity,
  wind,
  onPress,
}: IWeatherCardProps) => {
  const colors = useWeatherGradient(condition);
  return (
    <LinearGradient
      colors={colors}
      className="rounded-2xl p-6 mb-6 mt-6"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        borderRadius: 24,
      }}
    >
      <View className="items-center mb-4">
        <Ionicons name="sunny" size={56} color="#F6C453" />
      </View>
      <Text className="text-6xl font-black text-center text-black/90 mb-4">
        {temperature}°C
      </Text>
      <View className="items-center gap-3 mb-6">
        <View className="flex-row items-center gap-2">
          <Ionicons name="thermometer-outline" size={16} color="#374151" />
          <Text className="text-sm text-black/75 font-medium">
            Feels like: {feelsLike}°C
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Ionicons name="water-outline" size={16} color="#374151" />
          <Text className="text-sm text-black/75 font-medium">
            Humidity: {humidity}%
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="weather-windy"
            size={16}
            color="#374151"
          />
          <Text className="text-sm text-black/75 font-medium">
            Wind: {wind} km/h
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onPress()}
        className="items-center py-2 px-4 rounded-full bg-white/20 self-center"
        activeOpacity={0.8}
      >
        <Text className="text-sm font-bold text-[#1E40AF]">
          Ver previsão detalhada
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
