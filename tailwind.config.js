/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        orange: "#FF5500",
        "light-green": "#FFF3AD",
        green: "#6BA03D",
        "dark-green": "#021C11",
      },
      fontFamily: {
        sans: ["Noto Sans"],
      },
    },
  },
  plugins: [],
};
