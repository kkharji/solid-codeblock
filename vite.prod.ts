import { defineConfig } from "vite"
import solidPlugin, { Options } from "vite-plugin-solid"
import tsconfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"

const solidPluginOpts: Partial<Options> = {
  babel: { presets: ["solid"] }
}

export default defineConfig({
  plugins: [
    solidPlugin(),
    tsconfigPaths({ root: __dirname }), dts()
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "SolidJSCodeblock",
      formats: ["es"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/store"]
    }
  },
  optimizeDeps: {
    exclude: ["examples"]
  }
})
