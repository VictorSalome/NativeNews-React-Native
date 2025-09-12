import axios from "axios";

export const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2/",
  params: {
    language: "pt",
    domains:
      "globo.com,uol.com.br,estadao.com.br,folha.uol.com.br,terra.com.br,ig.com.br,g1.globo.com,r7.com,veja.abril.com.br,exame.com,cnnbrasil.com.br",
    sortBy: "publishedAt",
    pageSize: 20,
    apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY,
  },
});
