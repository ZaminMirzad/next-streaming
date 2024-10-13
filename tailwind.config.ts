import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#196076",
        darkBlue: "#2F8FAC",
        main: "#5FB0C8",
        lightBlue: "#9EC9D6",
        light: "#D6E6EA",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
