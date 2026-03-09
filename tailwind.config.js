/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        background: "#F5F3EE",
        primary: "#E8E4DD",
        accent: "#E63B2E",
        dark: "#111111",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        drama: ["'DM Serif Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
