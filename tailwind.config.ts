// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // src 폴더 안의 app 폴더 감시
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // src 폴더 안의 components 폴더 감시
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F9F8F5",
        ink: "#2C2C2C",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;