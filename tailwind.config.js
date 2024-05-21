/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        universal: "#1A73E8",
        darkBlue: "#1B66C9",
        paleBlack: "#343434",
      },
      fontFamily: {
        circular: ["circular"],
      },
    },
  },
  plugins: [],
};
