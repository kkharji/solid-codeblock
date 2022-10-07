import { FlowComponent, createContext, createSignal, mergeProps, createEffect, onMount, useContext } from "solid-js"
import { createStore, Store } from "solid-js/store"
import { getHighlighter, setCDN, Theme } from "shiki";
import { ICodeblockContext, ICodeblockProvider } from "./interface";

const CodeblockContext = createContext<Store<ICodeblockContext>>({ loading: true } as ICodeblockContext)

export const useCodeblockContext = () => useContext(CodeblockContext);

const defaultOpts = { theme: { dark: "dark-plus" as Theme, light: "light-plus" as Theme } }

export const CodeblockProvider: FlowComponent<{ opts: ICodeblockProvider }> = (userProps) => {
  const props = mergeProps({ opts: defaultOpts }, userProps)
  const [store, setStore] = createStore<ICodeblockContext>({ loading: true } as ICodeblockContext)
  const [theme, setTheme] = createSignal<Theme>(props.opts.theme!.dark);

  onMount(async () => {
    setStore("loading", true)
    setCDN('https://unpkg.com/shiki/');
    const shiki = await getHighlighter({
      langs: props.opts.langs,
      themes: [...Object.values(props.opts.theme!)]
    })
    setStore({
      addLang: shiki.loadLanguage,
      parse: (code, lang): string => shiki.codeToHtml(code, { lang, theme: theme() }),
      loading: false,
    })
  })

  // - Should use on???
  createEffect(() => {
    setTheme(props.opts.isDark() ? props.opts.theme!.dark : props.opts.theme!.light)
  })

  return (
    <CodeblockContext.Provider value={store}>
      {props.children}
    </CodeblockContext.Provider>)
}
