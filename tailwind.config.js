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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        scaleIn: 'scaleIn 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
