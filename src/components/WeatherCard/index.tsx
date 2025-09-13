import { useWeatherGradient } from "@/app/(dashboard)/home/mockData";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { IWeatherCardProps } from "./types";

interface IWeatherSensationProps {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const WEATHER_SENSATIONS: Record<string, IWeatherSensationProps> = {
  nublado: {
    icon: "cloudy",
    color: "#64748B",
  },
  chuvoso: {
    icon: "rainy",
    color: "#374151",
  },
  sol: {
    icon: "sunny",
    color: "#F59E0B",
  },
  "céu limpo": {
    icon: "sunny",
    color: "#F59E0B",
  },
  "poucas nuvens": {
    icon: "partly-sunny",
    color: "#94A3B8",
  },
  "nuvens dispersas": {
    icon: "cloudy",
    color: "#64748B",
  },
  tempestade: {
    icon: "thunderstorm",
    color: "#1E293B",
  },
  neve: {
    icon: "snow",
    color: "#E2E8F0",
  },
  névoa: {
    icon: "partly-sunny",
    color: "#9CA3AF",
  },
};

const DEFAULT_SENSATION: IWeatherSensationProps = {
  icon: "partly-sunny",
  color: "#94A3B8",
};

export const WeatherCard = ({
  weatherData,
  condition,
  temperature,
  feelsLike,
  onPress,
}: IWeatherCardProps) => {
  const colors = useWeatherGradient(condition);

  const weatherInfo = useMemo(() => {
    if (!weatherData) return null;

    const { main, wind, name, weather } = weatherData;
    const { temp, temp_min, temp_max, humidity } = main || {};
    const { speed } = wind || {};
    const weatherCondition = weather?.[0]?.description;

    return {
      name,
      temp,
      temp_min,
      temp_max,
      humidity,
      windSpeed: speed,
      condition: weatherCondition,
    };
  }, [weatherData]);

  const sensation = useMemo(() => {
    if (!weatherInfo?.condition) return DEFAULT_SENSATION;
    return WEATHER_SENSATIONS[weatherInfo.condition] || DEFAULT_SENSATION;
  }, [weatherInfo?.condition]);

  if (!weatherInfo) {
    return null;
  }

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
      {/* Header com localização e condição */}
      <View className="items-center mb-4">
        <Text className="text-lg font-bold text-center text-black/90 mb-4">
          {weatherInfo.name}
        </Text>

        {weatherInfo.condition && (
          <View className="items-center">
            <Ionicons name={sensation.icon} size={56} color={sensation.color} />
            <Text className="text-sm text-black/75 font-medium mt-2 capitalize">
              {weatherInfo.condition}
            </Text>
          </View>
        )}
      </View>

      {/* Temperatura principal */}
      <Text className="text-6xl font-black text-center text-black/90 mb-4">
        {weatherInfo.temp_min ? Math.round(weatherInfo.temp_min) : "--"}°C
      </Text>

      {/* Informações detalhadas */}
      <View className="items-center gap-3 mb-6">
        <View className="flex-row items-center gap-2">
          <Ionicons name="thermometer-outline" size={16} color="#374151" />
          <Text className="text-sm text-black/75 font-medium">
            Sensação: {feelsLike ? `${feelsLike}°C` : "--"}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="water-outline" size={16} color="#374151" />
          <Text className="text-sm text-black/75 font-medium">
            Umidade: {weatherInfo.humidity ? `${weatherInfo.humidity}%` : "--"}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="weather-windy"
            size={16}
            color="#374151"
          />
          <Text className="text-sm text-black/75 font-medium">
            Vento:{" "}
            {weatherInfo.windSpeed
              ? `${Math.round(weatherInfo.windSpeed)} km/h`
              : "--"}
          </Text>
        </View>
      </View>

      {/* Botão de ação */}
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
