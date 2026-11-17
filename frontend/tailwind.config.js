/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F0F0F",
          card: "#1C1C1E",
          yellow: "#F59E0B",
          yellowHover: "#D97706",
          grayText: "#A1A1AA",
          accentBg: "#2A2A2D"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
