import { openWeatherApi } from "@/services/axios/openWeatherApi";
import type {
  IFetchCurrentWeatherProps,
  IFetchCurrentWeatherResponse,
} from "./types";

export const fetchCurrentWeather = async ({
  lat,
  lon,
}: IFetchCurrentWeatherProps) => {
  const { data } = await openWeatherApi.get<IFetchCurrentWeatherResponse>(
    "/weather",
    {
      params: {
        lat,
        lon,
      },
    },
  );
  return data;
};
