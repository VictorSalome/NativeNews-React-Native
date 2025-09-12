import { newsApi } from "@/services/axios/newsApi";
import type { INewsData } from "./types";

export const fetchNewsByCategory = async (
  category: string,
): Promise<INewsData> => {
  const { data } = await newsApi.get<INewsData>("/everything", {
    params: { q: category },
  });
  return data;
};

export const fetchNewsBySearch = async (
  searchQuery: string,
): Promise<INewsData> => {
  const { data } = await newsApi.get<INewsData>("/everything", {
    params: {
      q: searchQuery,
      language: "pt", // Para resultados em português
      sortBy: "relevancy", // Ordenar por relevância
    },
  });
  return data;
};
