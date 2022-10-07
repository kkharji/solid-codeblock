import * as solid from "solid-js"
import { createStore } from "solid-js/store"
import { getHighlighter, setCDN, Theme } from "shiki";
import { ICodeblockContext, ICodeblockProvider } from "./interface";

type CodeblockComponent = solid.FlowComponent<{ opts: ICodeblockProvider }>;

const CodeblockContext = solid.createContext({ loading: true } as ICodeblockContext)
const useCodeblockContext = () => solid.useContext(CodeblockContext);
const defaultOpts: { themes: Record<"dark" | "light", Theme> } = {
  themes: { dark: "dark-plus", light: "light-plus" }
}

const CodeblockProvider: CodeblockComponent = (props) => {
  const opts = solid.mergeProps(defaultOpts, props.opts)
  const singleTheme = opts.theme !== undefined;
  const [store, setStore] = createStore({
    loading: true,
    theme: singleTheme ? opts.theme : opts.themes.dark
  } as ICodeblockContext)

  solid.onMount(async () => {
    setCDN(opts.ShikiSDNRoot ? opts.ShikiSDNRoot : "https://unpkg.com/shiki/");
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
