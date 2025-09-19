import React, { useMemo, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dados mockados do clima atual
const currentWeatherMock = {
  city: "São Paulo",
  state: "SP",
  condition: "partly-cloudy" as
    | "sunny"
    | "cloudy"
    | "rain"
    | "partly-cloudy"
    | "night",
  temperature: 24,
  description: "Parcialmente Nublado",
  feelsLike: 26,
  humidity: 60,
  windSpeed: 15,
  pressure: 1013,
  visibility: 10,
  sunrise: "06:30",
  sunset: "18:30",
};

// Dados mockados da previsão horária
const hourlyForecastMock = [
  { time: "14h", temperature: 25, condition: "sunny" },
  { time: "15h", temperature: 24, condition: "partly-cloudy" },
  { time: "16h", temperature: 23, condition: "cloudy" },
  { time: "17h", temperature: 22, condition: "cloudy" },
  { time: "18h", temperature: 20, condition: "rain" },
  { time: "19h", temperature: 18, condition: "rain" },
  { time: "20h", temperature: 17, condition: "night" },
  { time: "21h", temperature: 16, condition: "night" },
];

// Dados mockados da previsão de 7 dias
const weeklyForecastMock = [
  {
    day: "Sábado",
    condition: "sunny",
    maxTemp: 28,
    minTemp: 19,
  },
  {
    day: "Domingo",
    condition: "rain",
    maxTemp: 17,
    minTemp: 14,
  },
  {
    day: "Segunda-feira",
    condition: "partly-cloudy",
    maxTemp: 22,
    minTemp: 16,
  },
  {
    day: "Terça-feira",
    condition: "sunny",
    maxTemp: 25,
    minTemp: 18,
  },
  {
    day: "Quarta-feira",
    condition: "cloudy",
    maxTemp: 21,
    minTemp: 15,
  },
  {
    day: "Quinta-feira",
    condition: "rain",
    maxTemp: 19,
    minTemp: 13,
  },
  {
    day: "Sexta-feira",
    condition: "sunny",
    maxTemp: 26,
    minTemp: 17,
  },
];

// Hook para gradientes baseados na condição climática
const WEATHER_GRADIENTS = {
  rain: ["#4F6D7A", "#C0D6DF"] as const, // azul chuvoso
  cloudy: ["#8BA4B1", "#E1EBF0"] as const, // nublado
  night: ["#0F2027", "#203A43"] as const, // noite
  "partly-cloudy": ["#87CEEB", "#E0F6FF"] as const, // parcialmente nublado
  sunny: ["#9DD4F6", "#F7D4A9"] as const, // ensolarado
} as const;

function useWeatherGradient(condition: typeof currentWeatherMock.condition) {
  return useMemo(() => {
    return WEATHER_GRADIENTS[condition] || WEATHER_GRADIENTS.sunny;
  }, [condition]);
}

// Função para obter ícone baseado na condição
function getWeatherIcon(condition: string, size: number = 24) {
  const iconColor = "#F6C453";

  switch (condition) {
    case "sunny":
      return <Ionicons name="sunny" size={size} color={iconColor} />;
    case "cloudy":
      return <Ionicons name="cloudy" size={size} color="#9CA3AF" />;
    case "rain":
      return <Ionicons name="rainy" size={size} color="#60A5FA" />;
    case "partly-cloudy":
      return <Ionicons name="partly-sunny" size={size} color={iconColor} />;
    case "night":
      return <Ionicons name="moon" size={size} color="#A78BFA" />;
    default:
      return <Ionicons name="sunny" size={size} color={iconColor} />;
  }
}

export default function Weather() {
  const [refreshing, setRefreshing] = useState(false);

  // const dateText = useMemo(() => {
  //   const now = new Date();
  //   return now.toLocaleDateString("pt-BR", {
  //     weekday: "long",
  //     day: "numeric",
  //     month: "long",
  //   });
  // }, []);

  const gradient = useWeatherGradient(currentWeatherMock.condition);

  // Função para atualizar dados do clima
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simula uma requisição à API
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Componente do header simplificado
  const renderHeader = () => (
    <View className="bg-surface dark:bg-surface-dark px-4 py-3">
      <View className="flex-row items-center justify-center">
        <Text className="text-lg font-semibold text-text-base dark:text-text-base-dark">
          Clima
        </Text>
      </View>
    </View>
  );

  // Componente da visão geral do clima atual
  const renderCurrentWeather = () => (
    <LinearGradient
      colors={gradient}
      className="mx-4 mt-4 rounded-2xl p-6"
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
      {/* Localização */}
      <View className="flex-row items-center justify-center mb-4">
        <Ionicons name="location" size={20} color="#374151" />
        <Text className="text-lg font-bold text-black/90 ml-2">
          {currentWeatherMock.city}, {currentWeatherMock.state}
        </Text>
      </View>

      {/* Temperatura e ícone */}
      <View className="items-center mb-4">
        {getWeatherIcon(currentWeatherMock.condition, 64)}
        <Text className="text-6xl font-black text-center text-black/90 mt-2">
          {currentWeatherMock.temperature}°C
        </Text>
        <Text className="text-lg font-medium text-black/75 mt-1">
          {currentWeatherMock.description}
        </Text>
      </View>

      {/* Detalhes adicionais em grade */}
      <View className="flex-row flex-wrap justify-between">
        <View className="w-[48%] bg-white/20 rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="thermometer-outline" size={16} color="#374151" />
            <Text className="text-xs text-black/60 ml-1 font-medium">
              Sensação
            </Text>
          </View>
          <Text className="text-sm font-bold text-black/90">
            {currentWeatherMock.feelsLike}°C
          </Text>
        </View>

        <View className="w-[48%] bg-white/20 rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="water-outline" size={16} color="#374151" />
            <Text className="text-xs text-black/60 ml-1 font-medium">
              Umidade
            </Text>
          </View>
          <Text className="text-sm font-bold text-black/90">
            {currentWeatherMock.humidity}%
          </Text>
        </View>

        <View className="w-[48%] bg-white/20 rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <MaterialCommunityIcons
              name="weather-windy"
              size={16}
              color="#374151"
            />
            <Text className="text-xs text-black/60 ml-1 font-medium">
              Vento
            </Text>
          </View>
          <Text className="text-sm font-bold text-black/90">
            {currentWeatherMock.windSpeed} km/h
          </Text>
        </View>

        <View className="w-[48%] bg-white/20 rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <MaterialCommunityIcons name="gauge" size={16} color="#374151" />
            <Text className="text-xs text-black/60 ml-1 font-medium">
              Pressão
            </Text>
          </View>
          <Text className="text-sm font-bold text-black/90">
            {currentWeatherMock.pressure} hPa
          </Text>
        </View>

        <View className="w-[48%] bg-white/20 rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="eye-outline" size={16} color="#374151" />
            <Text className="text-xs text-black/60 ml-1 font-medium">
              Visibilidade
            </Text>
          </View>
          <Text className="text-sm font-bold text-black/90">
            {currentWeatherMock.visibility} km
          </Text>
        </View>

        <View className="w-[48%] bg-white/20 rounded-lg p-3 mb-3">
          <View className="flex-row items-center mb-1">
            <Ionicons name="sunny-outline" size={16} color="#374151" />
            <Text className="text-xs text-black/60 ml-1 font-medium">
              Pôr do Sol
            </Text>
          </View>
          <Text className="text-sm font-bold text-black/90">
            {currentWeatherMock.sunset}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );

  // Componente da previsão horária
  const renderHourlyForecast = () => (
    <View className="mt-6">
      <Text className="text-xl font-bold text-text-base dark:text-text-base-dark px-4 mb-4">
        Previsão por Hora
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <View className="flex-row gap-3">
          {hourlyForecastMock.map((item, index) => (
            <View
              key={index}
              className="bg-surface dark:bg-surface-dark rounded-2xl p-4 items-center border border-border dark:border-border-dark"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                minWidth: 80,
              }}
            >
              <Text className="text-sm font-medium text-text-base dark:text-text-base-dark mb-2">
                {item.time}
              </Text>
              <View className="mb-2">{getWeatherIcon(item.condition, 32)}</View>
              <Text className="text-lg font-bold text-text-base dark:text-text-base-dark">
                {item.temperature}°
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  // Componente da previsão semanal
  const renderWeeklyForecast = () => (
    <View className="mt-6 px-4">
      <Text className="text-xl font-bold text-text-base dark:text-text-base-dark mb-4">
        Previsão para 7 Dias
      </Text>
      <View className="bg-surface dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark overflow-hidden">
        {weeklyForecastMock.map((item, index) => (
          <View
            key={index}
            className={`flex-row items-center justify-between p-4 ${
              index !== weeklyForecastMock.length - 1
                ? "border-b border-border dark:border-border-dark"
                : ""
            }`}
          >
            <View className="flex-1">
              <Text className="text-base font-medium text-text-base dark:text-text-base-dark">
                {item.day}
              </Text>
            </View>

            <View className="flex-row items-center flex-1 justify-center">
              {getWeatherIcon(item.condition, 28)}
            </View>

            <View className="flex-1 flex-row justify-end items-center">
              <Text className="text-base font-bold text-text-base dark:text-text-base-dark mr-2">
                {item.maxTemp}°
              </Text>
              <Text className="text-base text-text-muted dark:text-text-muted-dark">
                {item.minTemp}°
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {/* Header */}
      {renderHeader()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#4FA6BB"]}
            tintColor={"#4FA6BB"}
          />
        }
      >
        {/* Visão Geral do Clima Atual */}
        {renderCurrentWeather()}

        {/* Previsão Horária */}
        {renderHourlyForecast()}

        {/* Previsão Semanal */}
        {renderWeeklyForecast()}
      </ScrollView>
    </SafeAreaView>
  );
}
