import { useQuery } from "@tanstack/react-query";
import { fetchNewsByCategory } from "../requests";

export const useNewsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["news", category],
    queryFn: () => fetchNewsByCategory(category),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (nova nomenclatura v5)
    refetchOnWindowFocus: true, // ✅ Importante para mobile
    refetchOnReconnect: true, // ✅ Reconexão de internet
    refetchInterval: 5 * 60 * 1000, // A cada 5 minutos
    refetchIntervalInBackground: false, // Economizar bateria
    retry: 2,
  });
};
