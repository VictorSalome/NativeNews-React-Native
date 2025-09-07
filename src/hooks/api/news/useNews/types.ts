export type NewsError = string | null;

export interface INewsData {
  status: string;
  totalResults: number;
  articles: IArticle[] | undefined;
}

export interface IArticle {
  source: ISource;
  author?: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface ISource {
  id: string | null;
  name: string;
}
