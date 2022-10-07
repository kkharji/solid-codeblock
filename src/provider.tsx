import { FlowComponent, createContext, createSignal, mergeProps, createEffect, onMount, useContext } from "solid-js"
import { createStore, Store } from "solid-js/store"
import { getHighlighter, setCDN, Theme } from "shiki";
import { ICodeblockContext, ICodeblockProvider } from "./interface";

const CodeblockContext = createContext<Store<ICodeblockContext>>({ loading: true } as ICodeblockContext)

export const useCodeblockContext = () => useContext(CodeblockContext);

const defaultOpts: { themes: Record<"dark" | "light", Theme> } = { themes: { dark: "dark-plus", light: "light-plus" } }

export const CodeblockProvider: FlowComponent<{ opts: ICodeblockProvider }> = (props) => {
  const { theme: userTheme, themes, langs, isDark } = mergeProps(defaultOpts, props.opts)
  const singleTheme = userTheme !== undefined;
  const [store, setStore] = createStore<ICodeblockContext>({ loading: true } as ICodeblockContext)
  const [theme, setTheme] = createSignal<Theme>(singleTheme ? userTheme : themes.dark);

  onMount(async () => {
    setCDN('https://unpkg.com/shiki/');
    const shiki = await getHighlighter({
      langs: langs,
      themes: singleTheme ? undefined : [...Object.values(themes)],
      theme: userTheme
    })
    setStore({
      addLang: shiki.loadLanguage,
      parse: (code, lang): string => shiki.codeToHtml(code, { lang, theme: theme() }),
      loading: false,
    })
  })

  if (isDark) {
    createEffect(() => { setTheme(isDark() ? themes.dark : themes.light) })
  }

  return (
    <CodeblockContext.Provider value={store}>
      {props.children}
    </CodeblockContext.Provider>)
}
