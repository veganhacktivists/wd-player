const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html"],
  theme: {
    colors: {
      accent: "#f4c41a",
      beige: "#efe9dc",
      black: "#000",
      dark: "#171716",
      gray: "#57524e",
      white: "#f6f5f2",
    },
    fontFamily: {
      rock: "'Rock Salt', cursive",
      rubik: "'Rubik', sans-serif",
    },
    extend: {
      animation: {
        dialog: "dialog 300ms ease-out",
        fadein: "dialog 300ms ease-out",
      },
      fontFamily: {
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        dialog: {
          "0%": { transform: "translateY(3rem)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
