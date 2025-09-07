import type { IArticle } from "@/hooks/api/news/types";

export interface INewsCardHomeProps {
  article: IArticle;
  onPress?: () => void;
}
