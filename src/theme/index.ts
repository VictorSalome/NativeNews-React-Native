module.exports = {
  theme: {
    colors: {
      // Cores principais
      primary: "rgb(var(--color-primary-values) / <alpha-value>)",
      secondary: "rgb(var(--color-secondary-values) / <alpha-value>)",
      accent: "rgb(var(--color-accent-values) / <alpha-value>)",

      // Cores neutras
      background: "rgb(var(--color-background-values) / <alpha-value>)",
      surface: "rgb(var(--color-surface-values) / <alpha-value>)",
      "text-base": "rgb(var(--color-text-base-values) / <alpha-value>)",
      "text-muted": "rgb(var(--color-text-muted-values) / <alpha-value>)",

      // Cores de feedback
      success: "rgb(var(--color-success-values) / <alpha-value>)",
      warning: "rgb(var(--color-warning-values) / <alpha-value>)",
      error: "rgb(var(--color-error-values) / <alpha-value>)",

      // Tons de cinza
      "gray-50": "rgb(var(--color-gray-50-values) / <alpha-value>)",
      "gray-100": "rgb(var(--color-gray-100-values) / <alpha-value>)",
      "gray-200": "rgb(var(--color-gray-200-values) / <alpha-value>)",
      "gray-300": "rgb(var(--color-gray-300-values) / <alpha-value>)",
      "gray-400": "rgb(var(--color-gray-400-values) / <alpha-value>)",
      "gray-500": "rgb(var(--color-gray-500-values) / <alpha-value>)",
      "gray-600": "rgb(var(--color-gray-600-values) / <alpha-value>)",
      "gray-700": "rgb(var(--color-gray-700-values) / <alpha-value>)",
      "gray-800": "rgb(var(--color-gray-800-values) / <alpha-value>)",
      "gray-900": "rgb(var(--color-gray-900-values) / <alpha-value>)",
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        // Tema claro (padrão)
        ":root": {
          // Cores principais baseadas no logo NativeNews
          "--color-primary-values": "79 166 187", // Azul turquesa do logo
          "--color-secondary-values": "68 68 68", // Cinza escuro do logo
          "--color-accent-values": "111 188 207", // Azul turquesa mais claro

          // Cores neutras para tema claro
          "--color-background-values": "249 250 251", // Cinza muito claro
          "--color-surface-values": "255 255 255", // Branco
          "--color-text-base-values": "68 68 68", // Cinza escuro do logo
          "--color-text-muted-values": "107 114 128", // Cinza médio

          // Cores de feedback
          "--color-success-values": "34 197 94", // Verde
          "--color-warning-values": "251 191 36", // Amarelo
          "--color-error-values": "239 68 68", // Vermelho

          // Tons de cinza
          "--color-gray-50-values": "249 250 251",
          "--color-gray-100-values": "243 244 246",
          "--color-gray-200-values": "229 231 235",
          "--color-gray-300-values": "209 213 219",
          "--color-gray-400-values": "156 163 175",
          "--color-gray-500-values": "107 114 128",
          "--color-gray-600-values": "75 85 99",
          "--color-gray-700-values": "55 65 81",
          "--color-gray-800-values": "31 41 55",
          "--color-gray-900-values": "17 24 39",
        },

        // Tema escuro
        ".dark": {
          // Cores principais baseadas no logo NativeNews
          "--color-primary-values": "111 188 207", // Azul turquesa mais claro para destaque
          "--color-secondary-values": "79 166 187", // Azul turquesa do logo
          "--color-accent-values": "147 210 225", // Azul turquesa ainda mais claro

          // Cores neutras para tema escuro
          "--color-background-values": "24 24 27", // Cinza muito escuro
          "--color-surface-values": "39 39 42", // Cinza escuro para cards
          "--color-text-base-values": "243 244 246", // Cinza muito claro
          "--color-text-muted-values": "156 163 175", // Cinza médio

          // Cores de feedback
          "--color-success-values": "34 197 94", // Verde
          "--color-warning-values": "251 191 36", // Amarelo
          "--color-error-values": "239 68 68", // Vermelho

          // Tons de cinza invertidos para tema escuro
          "--color-gray-900-values": "249 250 251",
          "--color-gray-800-values": "243 244 246",
          "--color-gray-700-values": "229 231 235",
          "--color-gray-600-values": "209 213 219",
          "--color-gray-500-values": "156 163 175",
          "--color-gray-400-values": "107 114 128",
          "--color-gray-300-values": "75 85 99",
          "--color-gray-200-values": "55 65 81",
          "--color-gray-100-values": "31 41 55",
          "--color-gray-50-values": "17 24 39",
        },
      }),
  ],
};
