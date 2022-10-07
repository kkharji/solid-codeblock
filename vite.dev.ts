import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import { viteStaticCopy } from "vite-plugin-static-copy"
import type { Lang, Theme } from "shiki"

// note viteStaticCopy doesn't copy over files during dev :(
const shikiRoot = "node_modules/shiki";

const getTheme = (name: Theme) => ({
  src: `${shikiRoot}/themes/${name}.json`,
  dest: "shiki/themes"
})

const getLang = (lang: Lang) => ({
  src: `${shikiRoot}/languages/${lang}.tmLanguage.json`,
  dest: "shiki/languages"
})

const staticOpts = {
  targets: [
    getTheme("github-light"),
    getTheme("github-dark"),
    getTheme("dark-plus"),
    getTheme("light-plus"),
    getLang("tsx"),
    getLang("viml"),
    getLang("shellscript"),
    getLang("json"),
    { src: "node_modules/shiki/dist/onig.wasm", dest: "shiki/dist" }
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
