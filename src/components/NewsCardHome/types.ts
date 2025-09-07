import type { IArticle } from "@/hooks/api/news/useNews/types";

export interface INewsCardHomeProps {
  article: IArticle;
  onPress?: () => void;
}
