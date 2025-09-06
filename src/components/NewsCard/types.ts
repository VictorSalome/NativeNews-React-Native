import type { IArticle } from "@/hooks/api/news/useNewsAll/types";

export interface INewsCardProps {
  article: IArticle;
  onPress?: () => void;
}
