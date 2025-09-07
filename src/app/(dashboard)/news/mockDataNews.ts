// Categorias de notícias
export const categories = [
  { id: "geral", name: "Geral", active: true },
  { id: "tecnologia", name: "Tecnologia", active: false },
  { id: "esportes", name: "Esportes", active: false },
  { id: "mundo", name: "Mundo", active: false },
];

// Dados mockados de notícias (futuramente virão de uma API)
export const newsMock = [
  {
    id: "1",
    title: "SpaceX launches new rocket mission to Mars",
    source: "BBC Brasil",
    time: "5 min atrás",
    image: "https://picsum.photos/seed/space1/300/200",
    category: "tecnologia",
    isRead: false,
  },
  {
    id: "2",
    title: "SpaceX launches new rocket mission to explore deep space",
    source: "BBC Brasil",
    time: "4 min atrás",
    image: "https://picsum.photos/seed/space2/300/200",
    category: "tecnologia",
    isRead: false,
  },
  {
    id: "3",
    title: "Local team wins championship in final match",
    source: "BBC Brasil",
    time: "3 min atrás",
    image: "https://picsum.photos/seed/sports1/300/200",
    category: "esportes",
    isRead: true,
  },
  {
    id: "4",
    title: "Local team wins championship after intense competition",
    source: "BBC Brasil",
    time: "1 min atrás",
    image: "https://picsum.photos/seed/sports2/300/200",
    category: "esportes",
    isRead: false,
  },
  {
    id: "5",
    title:
      "New programming: New programming languages revolutionize development",
    source: "BBC Brasil",
    time: "5 min atrás",
    image: "https://picsum.photos/seed/tech1/300/200",
    category: "tecnologia",
    isRead: false,
  },
  {
    id: "6",
    title: "Global economy shows signs of recovery in Q3 2024",
    source: "Reuters",
    time: "8 min atrás",
    image: "https://picsum.photos/seed/economy1/300/200",
    category: "negocios",
    isRead: false,
  },
  {
    id: "7",
    title: "Climate change summit reaches historic agreement",
    source: "CNN Brasil",
    time: "12 min atrás",
    image: "https://picsum.photos/seed/climate1/300/200",
    category: "mundo",
    isRead: true,
  },
  {
    id: "8",
    title: "Breakthrough in cancer research offers new hope",
    source: "Folha de S.Paulo",
    time: "15 min atrás",
    image: "https://picsum.photos/seed/health1/300/200",
    category: "saude",
    isRead: false,
  },
];
