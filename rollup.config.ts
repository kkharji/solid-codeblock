import babel from "@rollup/plugin-babel"
import nodeResolve from "@rollup/plugin-node-resolve"
import sass from "rollup-plugin-sass"
// import reanme from 'babel-plugin-transform-rename-import'

export default {
  input: [
    "src/index.tsx"
  ],
  output: [
    {
      file: "dist/index.js",
      format: "es"
    }
  ],
  external: ["solid-js", "solid-js/store", "shiki"],
  plugins: [
    sass({
      include: ["./src/**/*.scss"],
      output: "./dist/index.css",
      runtime: require("sass")
    }),
    nodeResolve({
      extensions: [".js", ".ts", ".tsx", ".sass"]
    }),
    babel({
      extensions: [".js", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: ["solid", "@babel/preset-typescript"],
      exclude: "node_modules/**",
      plugins: [
        // [reanme, { original: "./index.scss", replacement: "./index.css" }]
      ]
    }),
  ]
}
