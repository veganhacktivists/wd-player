const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "wd-player",
      fileName: (format) => `wd-player.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") {
            return "wd-player.css";
          }

          return assetInfo.name;
        },
      },
    },
  },
});
