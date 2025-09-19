type IWeatherCondition = "sunny" | "cloudy" | "rain" | "night";

export interface IWeatherSensationProps {
  gradient: [string, string];
  color: string;
  icon: string;
  description: string;
}

export interface IWeatherSensations {
  [key: number]: IWeatherSensationProps;
}
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
