import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FB1B1B",
        secondary: "#D5A100",
        brand: "#243c5a",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
