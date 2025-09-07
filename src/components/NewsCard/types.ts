import type { IArticle } from "@/hooks/api/news/types";

export interface INewsCardProps {
  handleArticlePress: (article: IArticle) => void;
  article: IArticle;
  isDarkMode: boolean;
}
