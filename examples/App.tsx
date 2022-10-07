import { ICodeblockProvider } from '@codeblock/interface';
import { CodeblockProvider } from '@codeblock/provider';
import { Component, lazy, } from 'solid-js';
import { isDark, setMode } from './state';

const Simple = lazy(() => import("./simple"));
const providerOpts: ICodeblockProvider = {
  isDarkAccessor: isDark,
  langs: ["javascript", "tsx"],
  theme: {
    dark: "github-dark",
    light: "github-light"
  }
}
export const App: Component = () => {
  return (<>
    <CodeblockProvider {...providerOpts} >
      <h1 class="text-3xl font-bold underline py-5">Solidjs Codeblock</h1>
      <button
        class='rounded-xl bg-red-400 p-3 my-3 text-white hover:bg-red-500'
        textContent={`Theme: ${isDark() ? "dark" : "light"}`}
        onClick={() => setMode(!isDark())}
      />
      <Simple />
    </CodeblockProvider>
  </>
  )
}
