import { CodeblockProvider } from '@codeblock/provider';
import { Component, createMemo, lazy, } from 'solid-js';
import { useConfig } from './config';
import "./App.scss"

const Simple = lazy(() => import("./simple"));

export const App: Component = () => {
  const [config, setConfig] = useConfig()!;
  return (<>
    <CodeblockProvider opts={{
      isDark: createMemo(() => config.isDark),
      langs: ["javascript", "tsx"],
      theme: {
        dark: "github-dark",
        light: "github-light"
      }
    }}>
      <div class="flex gap-5">
        <h1 class="text-3xl font-bold" textContent="Solidjs Codeblock" />
        <button
          class='rounded-xl bg-gray-700 text-white dark:bg-gray-200 dark:text-black p-2 my-6  hover:bg-blend-darken text-xs'
          innerHTML={`Toggle <b>${config.isDark ? "light" : "dark"} mode</b>`}
          onClick={() => setConfig("isDark", !config.isDark)}
        />
      </div>
      <Simple />
    </CodeblockProvider>
  </>
  )
}
