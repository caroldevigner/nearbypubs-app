const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{jsx,js}", "./rneui.config.js"],
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      fontFamily: {
        raBold: "raBold",
        raSemiBold: "raSemiBold",
        rBold: "rBold",
        rMedium: "rMedium",
        rRegular: "rRegular",
        rcRegular: "rcRegular",
        rcMedium: "rcMedium",
        rcSemiBold: "rcSemiBold",
        glamourRegular: "glamourRegular"
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
