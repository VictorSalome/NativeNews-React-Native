import { newsApi } from "@/services/axios/api";
import { useEffect, useState } from "react";
import type { INewsData } from "./types";

export const useNewsAll = () => {
  const [newsAll, setNewsAll] = useState<INewsData>();
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  const fetchAllNews = async () => {
    try {
      setNewsLoading(true);
      const { data } = await newsApi.get<INewsData>("/everything", {
        params: {
          q: "Brasil",
        },
      });

      console.log(data);

      setNewsAll(data);
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
    fetchAllNews();
  }, []);

  return {
    newsAll,
    newsLoading,
    newsError,
    fetchAllNews,
  };
};
