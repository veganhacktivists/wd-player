const fs = require("fs/promises");
const path = require("path");
const { build: buildVite, createServer } = require("vite");
const config = require("./vite.config");

// Constants -------------------------------------------------------------------
const [, , script] = process.argv;
const players = ["plyr", "videojs"];
const defaultPlayer = "plyr";

// Commands --------------------------------------------------------------------
async function build() {
  await emptyOutDir("./dist");
  await Promise.all(
    players.map((player) => buildVite(createPlayerConfig(player)))
  );
}

async function dev() {
  const server = await createServer(createPlayerConfig(defaultPlayer));

  await server.listen();
}

// Helpers ---------------------------------------------------------------------
function createPlayerConfig(player) {
  const name = "wd-player" + (player === defaultPlayer ? "" : `-${player}`);

  return {
    ...config,
    build: {
      emptyOutDir: false,
      ...config.build,
      lib: {
        ...config.build.lib,
        name,
        entry: path.resolve(__dirname, `lib/${player}/index.ts`),
        fileName: (format) => `${name}.${format}.js`,
      },
    },
  };
}

async function emptyOutDir(dir) {
  const files = await fs.readdir(dir);

  return Promise.all(files.map((file) => fs.unlink(path.join(dir, file))));
}

// Main ------------------------------------------------------------------------
if (script === "build") {
  build();
} else if (script === "dev") {
  dev();
} else {
  console.error("Invalid argument passed to script.js");
  process.exit(1);
}
