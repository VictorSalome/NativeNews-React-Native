import { newsApi } from "@/services/axios/api";
import { useEffect, useState } from "react";
import type { INewsData } from "./types";

export const useNews = (category: string) => {
  const [news, setNews] = useState<INewsData>();
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      const { data } = await newsApi.get<INewsData>("/everything", {
        params: {
          q: category,
        },
      });

      setNews(data);
      setNewsError(null);
    } catch (error) {
      console.log(error);
      setNewsError(
        error instanceof Error ? error.message : "Erro ao carregar notícias",
      );
      setNewsLoading(false);
    } finally {
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return {
    news,
    newsLoading,
    newsError,
    fetchNews,
  };
};
