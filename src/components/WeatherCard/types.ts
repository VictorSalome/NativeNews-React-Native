import type { IFetchCurrentWeatherResponse } from "@/hooks/api/weather/requests/types";

export interface IWeatherCardProps {
  condition: "sunny" | "cloudy" | "rain" | "night";
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  weatherData: IFetchCurrentWeatherResponse | undefined;
  onPress: () => void;
}
