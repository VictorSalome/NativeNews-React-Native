import type { IArticle } from "@/hooks/api/news/useNews/types";

export interface INewsHorizontalListProps {
  articles: IArticle[] | undefined;
  onArticlePress?: (article: IArticle) => void;
}
