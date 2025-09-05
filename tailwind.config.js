const themeConfig = require("./src/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: themeConfig.theme,
  plugins: themeConfig.plugins || [],
  darkMode: 'class',
};
