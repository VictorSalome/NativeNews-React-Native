import type { IFetchCurrentWeatherResponse } from "@/hooks/api/weather/requests/types";

export interface IWeatherCardProps {
  weatherData: IFetchCurrentWeatherResponse | undefined;
  onPress: () => void;
}
