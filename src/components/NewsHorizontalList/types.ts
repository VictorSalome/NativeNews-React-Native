import type { IArticle } from "@/hooks/api/news/useNewsAll/types";

export interface INewsHorizontalListProps {
  articles: IArticle[] | undefined;
  onArticlePress?: (article: IArticle) => void;
}
