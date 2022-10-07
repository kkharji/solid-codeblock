import { FlowComponent, createContext, createSignal, mergeProps, createEffect, onMount, useContext } from "solid-js"
import { createStore, Store } from "solid-js/store"
import { getHighlighter, setCDN, Theme } from "shiki";
import { ICodeblockContext, ICodeblockProvider } from "./interface";

const CodeblockContext = createContext<Store<ICodeblockContext>>()

export const useCodeblockContext = () => useContext(CodeblockContext);

export const CodeblockProvider: FlowComponent<ICodeblockProvider> = (userProps) => {
  const props = mergeProps({ theme: { dark: "dark-plus" as Theme, light: "light-plus" as Theme } }, userProps)
  const [store, setStore] = createStore<ICodeblockContext>({ loading: true } as ICodeblockContext)
  const [theme, setTheme] = createSignal<Theme>(props.theme.dark);

  onMount(async () => {
    setStore("loading", true)
    setCDN('https://unpkg.com/shiki/');
    const instance = await getHighlighter({ langs: props.langs, themes: [...Object.values(props.theme)] })
    setStore({
      addLang: instance.loadLanguage,
      parse: (code, lang): string => instance.codeToHtml(code, { lang, theme: theme() }),
      loading: false,
    })
  })

  // - Should use on???
  createEffect(() => {
    setTheme(props.isDarkAccessor() ? props.theme.dark : props.theme.light)
  })

  return (
    <CodeblockContext.Provider value={store}>
      {props.children}
    </CodeblockContext.Provider>)
}
