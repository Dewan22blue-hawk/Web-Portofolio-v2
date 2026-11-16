/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#94a3b8", // slate-400 for clean high-contrast readability
        tertiary: "#0f172a", // slate-900
        "black-100": "#0b132b",
        "black-200": "#050816",
        "white-100": "#f8fafc",
        "electric-blue": "#2563eb",
        "sky-accent": "#38bdf8",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        border: "var(--color-border)",
        ring: "var(--color-ring)",
        "chart-1": "var(--color-chart-1)",
        "chart-2": "var(--color-chart-2)",
        "chart-3": "var(--color-chart-3)",
        "chart-4": "var(--color-chart-4)",
        "chart-5": "var(--color-chart-5)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(37, 99, 235, 0.15)",
        "blue-glow": "0 0 25px -5px rgba(37, 99, 235, 0.5), 0 0 10px -2px rgba(56, 189, 248, 0.3)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
