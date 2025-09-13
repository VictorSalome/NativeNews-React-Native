import axios from "axios";

export const openWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  params: {
    appid: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    lang: "pt_br",
    units: "metric",
  },
});
