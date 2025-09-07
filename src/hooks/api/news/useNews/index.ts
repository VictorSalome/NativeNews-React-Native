import { newsApi } from "@/services/axios/api";
import type { INewsData } from "./types";

export const fetchNewsByCategory = async (
  category: string,
): Promise<INewsData> => {
  const { data } = await newsApi.get<INewsData>("/everything", {
    params: { q: category },
  });
  return data;
};
