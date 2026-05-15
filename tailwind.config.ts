import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        paper: "#F4F1E8",
        lime: {
          DEFAULT: "#C8FF3D",
          soft: "#E4FF8A",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        ultratight: "-0.06em",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 80s linear infinite",
        "grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0)" },
          "70%": { transform: "translate(0, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
