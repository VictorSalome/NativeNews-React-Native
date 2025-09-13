import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "../requests";

export const useWeatherCurrent = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather-current", lat, lon],
    queryFn: () => fetchCurrentWeather({ lat, lon }),
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
};
