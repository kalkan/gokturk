/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#b8c8ff",
          300: "#8aa2ff",
          400: "#5b76f7",
          500: "#3d54e4",
          600: "#2e3fc0",
          700: "#273498",
          800: "#1e2a78",
          900: "#131b52",
          950: "#0a1033",
        },
        signal: {
          DEFAULT: "#fbbf24",
          soft: "#fde68a",
          deep: "#b45309",
        },
        terrain: {
          water: "#2dd4bf",
          vegetation: "#84cc16",
          urban: "#94a3b8",
          soil: "#c2410c",
          cloud: "#f8fafc",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Manrope"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -5px rgba(251, 191, 36, 0.35)",
        "glow-lg": "0 0 80px -10px rgba(91, 118, 247, 0.55)",
      },
      backgroundImage: {
        "space-grid":
          "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
        "aurora":
          "radial-gradient(ellipse at top, rgba(91, 118, 247, 0.25), transparent 55%), radial-gradient(ellipse at bottom right, rgba(251, 191, 36, 0.15), transparent 50%)",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "orbit": {
          "0%": { transform: "rotate(0deg) translateX(var(--orbit-r, 120px)) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--orbit-r, 120px)) rotate(-360deg)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 18s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "orbit": "orbit 22s linear infinite",
      },
    },
  },
  plugins: [],
};
