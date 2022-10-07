import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import { viteStaticCopy } from "vite-plugin-static-copy"

const staticOpts = {
  targets: [
    {
      src: "node_modules/shiki/themes/github-light.json",
      dest: "shiki/themes"
    },
    {
      src: "node_modules/shiki/themes/github-dark.json",
      dest: "shiki/themes"
    },
    {
      src: "node_modules/shiki/languages/typescript.tmLanguage.json",
      dest: "shiki/languages"
    },
    {
      src: "node_modules/shiki/languages/tsx.tmLanguage.json",
      dest: "shiki/languages"
    },
    {
      src: "node_modules/shiki/languages/viml.tmLanguage.json",
      dest: "shiki/languages"
    },
    {
      src: "node_modules/shiki/languages/shellscript.tmLanguage.json",
      dest: "shiki/languages"
    },
    {
      src: "node_modules/shiki/languages/json.tmLanguage.json",
      dest: "shiki/languages"
    },
    {
      src: "node_modules/shiki/languages/lua.tmLanguage.json",
      dest: "shiki/languages"
    },
    {
      src: "node_modules/shiki/dist/onig.wasm",
      dest: "shiki/dist"
    }
  ]
}
export default defineConfig({
  plugins: [
    solidPlugin(),
    tsconfigPaths({ root: __dirname }),
    viteStaticCopy(staticOpts)
  ],
  root: "./examples"
})
