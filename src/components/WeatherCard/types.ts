export interface IWeatherCardProps {
  condition: "sunny" | "cloudy" | "rain" | "night";
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  onPress: () => void;
}
