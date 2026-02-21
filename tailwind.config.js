/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1a1a1a", // Deep black for text/buttons
          accent: "#c5a059", // Gold/Brass for "Sale" or "Premium" tags
          muted: "#f4f4f4", // Light gray for backgrounds
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"], // Great for headings
      },
    },
  },
  plugins: [],
};
