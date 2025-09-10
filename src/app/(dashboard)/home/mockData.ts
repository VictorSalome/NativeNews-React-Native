// Dados mockados (futuramente virão de uma API)

import { useMemo } from "react";

type IWeatherCondition = "sunny" | "cloudy" | "rain" | "night";
export const weatherMock: {
  condition: IWeatherCondition;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
} = {
  condition: "sunny",
  temperature: 24,
  feelsLike: 26,
  humidity: 60,
  wind: 15,
};

export const WEATHER_GRADIENTS = {
  rain: ["#4F6D7A", "#C0D6DF"] as const,
  cloudy: ["#8BA4B1", "#E1EBF0"] as const,
  night: ["#0F2027", "#203A43"] as const,
  sunny: ["#9DD4F6", "#F7D4A9"] as const,
} as const;

export const useWeatherGradient = (condition: IWeatherCondition) => {
  return useMemo(() => {
    return WEATHER_GRADIENTS[condition] || WEATHER_GRADIENTS.sunny;
  }, [condition]);
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};
