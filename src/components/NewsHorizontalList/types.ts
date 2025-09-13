import type { IArticle } from "@/hooks/api/news/requests/types";

export interface INewsHorizontalListProps {
  articles: IArticle[] | undefined;
  onArticlePress?: (article: IArticle) => void;
}
