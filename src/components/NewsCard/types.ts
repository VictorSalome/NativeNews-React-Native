import type { IArticle } from "@/hooks/api/news/useNewsAll/types";

export interface INewsCardProps {
  handleArticlePress: (article: IArticle) => void;
  article: IArticle;
  isDarkMode: boolean;
}
