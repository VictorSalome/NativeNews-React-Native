// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      "import-helpers": require("eslint-plugin-import-helpers"),
    },
    rules: {
      // React Rules
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Console Rules - Allow warn and error for mobile debugging
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],

      // TypeScript Rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],

      // Import Rules for React Native
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],

      // Import Helpers for better organization
      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "always",
          groups: [
            "/^react$/",
            "module",
            ["parent", "sibling", "index"],
            "/./styles/",
          ],
          alphabetize: {
            order: "asc",
            ignoreCase: true,
          },
        },
      ],

      // TypeScript Naming Convention
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          custom: {
            regex: "[A-Z].+",
            match: true,
          },
        },
      ],

      // Prettier integration
      "prettier/prettier": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {},
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
      react: {
        version: "detect",
      },
    },
    ignores: ["dist/*", "node_modules/*", ".expo/*", "metro.config.js"],
  },
]);
