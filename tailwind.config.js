/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6d28d9",
          default: "#2C2D31",
          dark: "#4c1d95",
        },
        secondary: "#d97706",
        input: { background: "#1B2021", border: "#5E767C" },
        button: { background: "#003a66", hover: "#002d4d" },
        hover: "#3a3b40",
      },
    },
  },
  plugins: [],
};
