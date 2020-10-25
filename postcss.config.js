const production = !process.env.ROLLUP_WATCH;
const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");
// const postcssImport = require("postcss-import");
const cssnano = require("cssnano");

module.exports = {
  plugins: [
    // postcssImport(),
    autoprefixer(),
    production &&
      purgecss({
        content: ["./**/*.html", "./**/*.svelte", "./**/**/*.svelte"],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      }),
    production &&
      cssnano({
        preset: "default",
      }),
  ],
};
