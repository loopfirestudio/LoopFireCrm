/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#121319",
          soft: "#1A1C24",
          surface: "#20232D",
          border: "#2C303C",
        },
        mist: {
          DEFAULT: "#EDEBE6",
          dim: "#9A9CA8",
          faint: "#5F6270",
        },
        loop: {
          violet: "#8B7CFF",
          violetSoft: "#6F5FE0",
          ember: "#FFB454",
          coral: "#FF6F61",
          mint: "#5FE0B7",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
