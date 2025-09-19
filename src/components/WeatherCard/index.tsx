import { weatherSensationsCods } from "@/app/(dashboard)/home/mockData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

import type { IWeatherCardProps } from "./types";

export const WeatherCard = ({ weatherData, onPress }: IWeatherCardProps) => {
  if (!weatherData) return null;

  const { main, wind, name, weather } = weatherData;
  const { temp_min, humidity, feels_like } = main || {};
  const { speed } = wind || {};

  const weatherCondition = weather?.[0];
  const { id: conditionId } = weatherCondition || {};

  const currentCondition = conditionId
    ? weatherSensationsCods[conditionId]
    : undefined;

  const { description, icon, color, gradient } = currentCondition || {};

  return (
    <LinearGradient
      colors={gradient || ["#4F6D7A", "#C0D6DF"]}
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
      <View className="items-center mb-4 ">
        <Text className="text-lg font-bold text-center text-black/90 mb-4">
          {name || "--"}
        </Text>

        {currentCondition && (
          <View className="items-center">
            <Ionicons name={icon as any} size={56} color={color} />
            <Text className="text-sm text-black/75 font-medium mt-2 capitalize">
              {description || "--"}
            </Text>
          </View>
        )}
      </View>

      <Text className="text-6xl font-black text-center text-black/90 mb-4">
        {temp_min ? Math.round(temp_min) : "--"}°C
      </Text>

      <View className="items-center gap-3 mb-6">
        <View className="flex-row items-center gap-2">
          <Ionicons name="thermometer-outline" size={16} color="#374151" />
          <Text className="text-sm text-black/75 font-medium">
            Sensação: {feels_like ? `${Math.round(feels_like)}°C` : "--"}
          </Text>
        </View>
        ;
        <View className="flex-row items-center gap-2">
          <Ionicons name="water-outline" size={16} color="#374151" />
          <Text className="text-sm text-black/75 font-medium">
            Umidade: {humidity ? `${humidity}%` : "--"}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="weather-windy"
            size={16}
            color="#374151"
          />
          <Text className="text-sm text-black/75 font-medium">
            Vento: {speed ? `${Math.round(speed)} km/h` : "--"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        className="items-center py-3 px-6 rounded-full bg-white/20 self-center"
        activeOpacity={0.8}
      >
        <Text className="text-sm font-bold text-[#1E40AF]">
          Ver previsão detalhada
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
