import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#060606",
          surface: "#0c0c0c",
          elevated: "#121212",
          border: "#1c1a17",
        },
        ivory: {
          DEFAULT: "#EDE8E0",
          dim: "#C4BEB4",
          muted: "#8C867D",
          faint: "#4A4640",
        },
        rosegold: {
          DEFAULT: "#C9A05C",
          light: "#DFC085",
          dark: "#9E7B3E",
          dim: "rgba(201, 160, 92, 0.2)",
          subtle: "rgba(201, 160, 92, 0.08)",
        },
        acetate: {
          DEFAULT: "#593C2D",
          dark: "#3B261B",
          warm: "#704B37",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        luxury: "0.35em",
        epic: "0.5em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
