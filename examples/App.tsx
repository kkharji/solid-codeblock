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
      <button
        textContent={`Theme: ${isDark() ? "dark" : "light"}`}
        onClick={() => setMode(!isDark())}
      />
      <Simple />
    </CodeblockProvider>
  </>
  )
}
