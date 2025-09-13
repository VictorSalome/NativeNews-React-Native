import { useQuery } from "@tanstack/react-query";
import { fetchNewsBySearch } from "../requests";

export const useNewsBySearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["news-search", searchQuery],
    queryFn: () => fetchNewsBySearch(searchQuery),
    enabled: searchQuery.length >= 3, // Só busca com 3+ caracteres
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000,
  });
};
