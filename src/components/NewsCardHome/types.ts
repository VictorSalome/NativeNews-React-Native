import type { IArticle } from "@/hooks/api/news/useNewsAll/types";

export interface INewsCardHomeProps {
  article: IArticle;
  onPress?: () => void;
}
