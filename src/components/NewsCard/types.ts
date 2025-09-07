import type { IArticle } from "@/hooks/api/news/useNews/types";

export interface INewsCardProps {
  handleArticlePress: (article: IArticle) => void;
  article: IArticle;
  isDarkMode: boolean;
}
