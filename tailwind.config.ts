import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "navy" token — the logo's deep navy blue
        navy: {
          DEFAULT: "#0A1730",
          light: "#122642",
          soft: "#1B3357",
        },
        steel: "#5A6B85",
        concrete: "#F5F1E6",
        paper: "#FAF7EF",
        ink: "#10161F",
        // "amber" token — the logo's gold
        amber: {
          DEFAULT: "#D3A43A",
          light: "#F0CB6B",
          dim: "#8A6A1B",
        },
      },
      fontFamily: {
        display: ["var(--font-tajawal)", "sans-serif"],
        body: ["var(--font-cairo)", "sans-serif"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      // إضافة إعدادات الحركة والـ Keyframes للشريط المتحرك (Marquee)
// داخل tailwind.config.ts
animation: {
  marquee: "marquee 30s linear infinite",
},
keyframes: {
  marquee: {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
},
    },
  },
  plugins: [],
};

export default config;