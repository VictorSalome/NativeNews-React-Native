import { IWeatherSensations } from "@/app/(dashboard)/home/types";

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
};

export const weatherSensationsCods: IWeatherSensations = {
  // Thunder conditions
  200: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm-outline",
    description: "Trovoada com chuva leve",
    color: "#FFFF00", // Amarelo - trovão
  } as const,
  201: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm",
    description: "Trovoada com chuva",
    color: "#FFD700", // Dourado
  } as const,
  202: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm-sharp",
    description: "Trovoada com chuva forte",
    color: "#FFA500", // Laranja
  } as const,
  210: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "flash-outline",
    description: "Trovoada leve",
    color: "#FFFF66", // Amarelo claro
  } as const,
  211: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "flash",
    description: "Trovoada",
    color: "#FFD700",
  } as const,
  212: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "flash-sharp",
    description: "Trovoada forte",
    color: "#FF8C00",
  } as const,
  221: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm",
    description: "Trovoada irregular",
    color: "#FFA500",
  } as const,
  230: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm-outline",
    description: "Trovoada com garoa leve",
    color: "#FFFF99",
  } as const,
  231: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm",
    description: "Trovoada com garoa",
    color: "#FFD700",
  } as const,
  232: {
    gradient: ["#4F6D7A", "#C0D6DF"],
    icon: "thunderstorm-sharp",
    description: "Trovoada com garoa forte",
    color: "#FF8C00",
  } as const,

  // Drizzle conditions
  300: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-outline",
    description: "Garoa de baixa intensidade",
    color: "#ADD8E6", // Azul claro
  } as const,
  301: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Garoa",
    color: "#87CEEB",
  } as const,
  302: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Garoa intensa",
    color: "#4682B4",
  } as const,
  310: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-outline",
    description: "Garoa com chuva fraca",
    color: "#B0E0E6",
  } as const,
  311: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Garoa com chuva",
    color: "#5F9EA0",
  } as const,
  312: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Garoa com chuva intensa",
    color: "#4682B4",
  } as const,
  313: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Chuva com garoa e pancadas",
    color: "#6495ED",
  } as const,
  314: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Chuva forte com garoa",
    color: "#1E90FF",
  } as const,
  321: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Pancadas de garoa",
    color: "#00BFFF",
  } as const,

  // Rain conditions
  500: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-outline",
    description: "Chuva fraca",
    color: "#87CEFA",
  } as const,
  501: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Chuva moderada",
    color: "#4682B4",
  } as const,
  502: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Chuva forte",
    color: "#0000CD",
  } as const,
  503: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Chuva muito forte",
    color: "#191970",
  } as const,
  504: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Chuva extrema",
    color: "#00008B",
  } as const,
  511: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "snow",
    description: "Chuva congelante",
    color: "#AFEEEE",
  } as const,
  520: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-outline",
    description: "Pancada de chuva fraca",
    color: "#B0C4DE",
  } as const,
  521: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Pancada de chuva",
    color: "#4169E1",
  } as const,
  522: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy-sharp",
    description: "Pancada de chuva forte",
    color: "#00008B",
  } as const,
  531: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "rainy",
    description: "Pancadas de chuva irregulares",
    color: "#1E90FF",
  } as const,

  // Snow conditions
  600: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow-outline",
    description: "Neve leve",
    color: "#F0FFFF",
  } as const,
  601: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Neve",
    color: "#FFFFFF",
  } as const,
  602: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow-sharp",
    description: "Neve forte",
    color: "#E0FFFF",
  } as const,
  611: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Granizo",
    color: "#DCDCDC",
  } as const,
  612: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Pancadas de granizo",
    color: "#B0C4DE",
  } as const,
  613: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Pancadas de chuva com granizo",
    color: "#A9A9A9",
  } as const,
  615: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Chuva fraca com neve",
    color: "#ADD8E6",
  } as const,
  616: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Chuva com neve",
    color: "#B0E0E6",
  } as const,
  620: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow-outline",
    description: "Pancada de neve leve",
    color: "#F8F8FF",
  } as const,
  621: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow",
    description: "Pancada de neve",
    color: "#F0F8FF",
  } as const,
  622: {
    gradient: ["#E1EBF0", "#FFFFFF"],
    icon: "snow-sharp",
    description: "Pancada de neve forte",
    color: "#E6E6FA",
  } as const,

  // Atmosphere conditions
  701: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud-outline",
    description: "Névoa",
    color: "#696969",
  } as const,
  711: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Fumaça",
    color: "#708090",
  } as const,
  721: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Neblina seca",
    color: "#778899",
  } as const,
  731: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Redemoinhos de areia/poeira",
    color: "#C2B280",
  } as const,
  741: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Nevoeiro",
    color: "#A9A9A9",
  } as const,
  751: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Areia",
    color: "#DEB887",
  } as const,
  761: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Poeira",
    color: "#D2B48C",
  } as const,
  762: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Cinzas vulcânicas",
    color: "#2F4F4F",
  } as const,
  771: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Rajadas de vento fortes",
    color: "#708090",
  } as const,
  781: {
    gradient: ["#0F2027", "#203A43"],
    icon: "cloud",
    description: "Tornado",
    color: "#800000",
  } as const,

  // Clear sky
  800: {
    gradient: ["#9DD4F6", "#F7D4A9"],
    icon: "sunny",
    description: "Céu limpo",
    color: "#FFD700",
  } as const,

  // Cloud conditions
  801: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "partly-sunny-outline",
    description: "Poucas nuvens (11–25%)",
    color: "#C0C0C0",
  } as const,
  802: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "partly-sunny",
    description: "Nuvens dispersas (25–50%)",
    color: "#B0C4DE",
  } as const,
  803: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "cloud",
    description: "Nuvens fragmentadas (51–84%)",
    color: "#A9A9A9",
  } as const,
  804: {
    gradient: ["#8BA4B1", "#E1EBF0"],
    icon: "cloud-sharp",
    description: "Céu totalmente nublado (85–100%)",
    color: "#696969",
  } as const,
} as const;
