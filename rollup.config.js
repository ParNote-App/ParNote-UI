import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sveltePreprocess from "svelte-preprocess";
import copyTo from "rollup-plugin-copy-assets-to";
import replace from "@rollup/plugin-replace";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import rmdir from "rimraf";

rmdir("public/assets", function (error) {});

const fs = require("fs");
const configPath = "./config.js";

const config = {
  port: 5000,
  "api-url": "http://localhost:8088/api/",
};

try {
  if (fs.existsSync(configPath)) {
    const fileConfig = require(configPath);

    Object.keys(config).forEach((key, index) => {
      if (fileConfig.hasOwnProperty(key)) config[key] = fileConfig[key];
    });
  }
} catch (error) {
  console.error(error);
}

const production = !process.env.ROLLUP_WATCH;

const input = ["src/main.js"];

const watch = {
  clearScreen: false,
};

const plugins = [
  copyTo({
    assets: ["./src/assets"],
    outputDir: "public",
  }),

  babel({
    runtimeHelpers: true,
  }),

  svelte({
    // enable run-time checks when not in production
    dev: !production,

    preprocess: sveltePreprocess({
      postcss: true,
    }),

    css: function (css) {
      // console.log(css.code); // the concatenated CSS
      // console.log(css.map); // a sourcemap

      // creates `main.css` and `main.css.map`
      // using a falsy name will default to the bundle name
      // — pass `false` as the second argument if you don't want the sourcemap
      css.write(`public/assets/css/bundle.css`, true);
    },

    onwarn: (warning, handler) => {
      // e.g. don't warn on <marquee> elements, cos they're cool
      if (warning.code === "a11y-invalid-attribute") return;

      // let Rollup handle all other warnings normally
      handler(warning);
    },
  }),

  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ["svelte"],
  }),

  commonjs({
    namedExports: {
      "node_modules/jquery/dist/jquery.min.js": ["jquery"],
      "node_modules/bootstrap/dist/js/bootstrap.min.js": ["bootstrap"],
    },
  }),

  replace({
    "process.env.NODE_ENV": JSON.stringify(
      production ? "production" : "development"
    ),
  }),

  replace({
    "process.env.API_URL": JSON.stringify(production ? "" : config["api-url"]),
  }),

  // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(),

  // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && livereload({ watch: "public", port: 35731 }),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && terser(),
];

const esExport = {
  input: input,
  output: [
    {
      sourcemap: true,
      format: "es",
      name: "app",
      dir: "public/assets/js/es/",
    },
  ],
  plugins: plugins,
  watch: watch,
};

const systemExport = {
  input: input,
  output: [
    {
      sourcemap: true,
      format: "system",
      name: "app",
      dir: "public/assets/js/system/",
    },
  ],
  plugins: plugins,
  watch: watch,
};

const listExports = [esExport];

if (production) listExports.push(systemExport);

export default listExports;

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn(
          "npm",
          ["run", "start", "--", "--dev", "-p", config.port],
          {
            stdio: ["ignore", "inherit", "inherit"],
            shell: true,
          }
        );
      }
    },
  };
}
