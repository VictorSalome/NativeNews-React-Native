module.exports = {
  theme: {
    extend: {
      colors: {
        // Cores principais - Light Mode
        primary: "#4FA6BB", // Azul turquesa do logo
        secondary: "#444444", // Cinza escuro do logo
        accent: "#6FBCCF", // Azul turquesa mais claro

        // Cores principais - Dark Mode (com sufixo -dark)
        "primary-dark": "#6FBCCF", // Azul turquesa mais claro para destaque
        "secondary-dark": "#4FA6BB", // Azul turquesa do logo
        "accent-dark": "#93D2E1", // Azul turquesa ainda mais claro

        // Cores neutras - Light Mode
        background: "#F9FAFB", // Cinza muito claro
        surface: "#FFFFFF", // Branco
        "text-base": "#444444", // Cinza escuro do logo
        "text-muted": "#6B7280", // Cinza médio
        border: "#E5E7EB", // Cinza claro para bordas
        input: "#F3F4F6", // Cinza muito claro para inputs

        // Cores neutras - Dark Mode
        "background-dark": "#18181B", // Cinza muito escuro
        "surface-dark": "#27272A", // Cinza escuro para cards
        "text-base-dark": "#F3F4F6", // Cinza muito claro
        "text-muted-dark": "#9CA3AF", // Cinza médio
        "border-dark": "#374151", // Cinza escuro para bordas
        "input-dark": "#374151", // Cinza escuro para inputs

        // Cores de feedback (iguais para ambos os modos)
        success: "#22C55E", // Verde
        "success-dark": "#22C55E", // Verde
        warning: "#FBBF24", // Amarelo
        "warning-dark": "#FBBF24", // Amarelo
        error: "#EF4444", // Vermelho
        "error-dark": "#EF4444", // Vermelho

        // Tons de cinza - Light Mode
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",
        "gray-500": "#6B7280",
        "gray-600": "#4B5563",
        "gray-700": "#374151",
        "gray-800": "#1F2937",
        "gray-900": "#111827",

        // Tons de cinza - Dark Mode (invertidos)
        "gray-50-dark": "#111827",
        "gray-100-dark": "#1F2937",
        "gray-200-dark": "#374151",
        "gray-300-dark": "#4B5563",
        "gray-400-dark": "#6B7280",
        "gray-500-dark": "#9CA3AF",
        "gray-600-dark": "#D1D5DB",
        "gray-700-dark": "#E5E7EB",
        "gray-800-dark": "#F3F4F6",
        "gray-900-dark": "#F9FAFB",
      },
    },
  },
};
