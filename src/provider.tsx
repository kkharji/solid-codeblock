import * as solid from "solid-js"
import { createStore } from "solid-js/store"
import { getHighlighter, setCDN } from "shiki";
import * as cb from "./interface";

const defaultOpts: cb.ICodeblockProviderDefaults = {
  themes: { dark: "dark-plus", light: "light-plus" },
  cdnRoot: "https://unpkg.com/shiki/"
}

const CodeblockContext = solid.createContext({ loading: true } as cb.ICodeblockContext)
const useCodeblockContext = () => solid.useContext(CodeblockContext);

const CodeblockProvider: cb.CodeblockProviderComponent = (props) => {
  const opts = solid.mergeProps(defaultOpts, props.opts)
  const singleTheme = opts.theme !== undefined;
  const [store, setStore] = createStore({
    loading: true,
    theme: singleTheme ? opts.theme : opts.themes.dark
  } as cb.ICodeblockContext)


  solid.onMount(async () => {
    setCDN(opts.cdnRoot);
    const shiki = await getHighlighter({
      langs: opts.langs,
      themes: singleTheme ? undefined : [...Object.values(opts.themes)],
      theme: opts.theme
    })
    setStore({
      addLang: shiki.loadLanguage,
      parse: (code, lang): string => shiki.codeToHtml(code, {
        lang, theme: store.theme
      }),
      loading: false,
    })
  })

  if (opts.isDark) {
    const isDark = opts.isDark;
    solid.createEffect(() => {
      setStore("theme", isDark() ? opts.themes.dark : opts.themes.light)
    })
  }

  return (
    <CodeblockContext.Provider
      value={store}
      children={props.children}
    />
  )
}

export { useCodeblockContext, CodeblockProvider }
