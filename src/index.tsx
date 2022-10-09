import { ILanguageRegistration, Lang, Theme } from "shiki";
import { Accessor, createEffect, createMemo, onMount, ParentProps, useContext } from "solid-js"
import { createResource, mergeProps, ParentComponent, Show, createContext } from "solid-js";
import { createStore } from "solid-js/store";
import { getHighlighter, setCDN } from "shiki";
import { Component, JSXElement } from "solid-js";
import "./index.scss"

/**
 * Codeblock Context value
 */
export interface ICodeblockContext {
  /**
   * Add extra language
   */
  addLang(lang: ILanguageRegistration | Lang): Promise<void>,
  /**
   * Parse Code to html
   */
  parse(code: string, lang: Lang): string,
  /**
   * Is highlighter still being loaded
   */
  loading: boolean,
  /**
   * Current theme name
   */
  theme: Theme
}

const CodeblockContext = createContext({ loading: true } as ICodeblockContext)
export const useCodeblockContext = () => useContext(CodeblockContext);

/**
 * Provider Intialize Options
 */
export type ICodeblockProvider = {
  /**
   * Solid Signal that resolve to whether the theme is dark or light.
   */
  isDark?: Accessor<boolean>
  /**
   * A map of dark/light themes to load upfront. Default to: `{}`
   */
  themes?: Record<"dark" | "light", Theme>;
  /**
   * A signle theme to load Default to: `dark-plus`
   */
  theme?: Theme;
  /**
   * A list of languages to load upfront, Default to all the bundled languages.
   */
  langs?: (Lang | ILanguageRegistration)[];
  /**
   * Where to look for shiki runtime files, Default: https://unpkg.com/shiki/
   */
  cdnRoot?: string
};

const DefaultProviderOpts: Required<Pick<ICodeblockProvider, "cdnRoot" | "themes">> = {
  themes: { dark: "dark-plus", light: "light-plus" },
  cdnRoot: "https://unpkg.com/shiki/"
}

export const CodeblockProvider = (props: ParentProps<{ opts: ICodeblockProvider }>) => {
  const opts = mergeProps(DefaultProviderOpts, props.opts)
  const singleTheme = opts.theme !== undefined;
  const [store, setStore] = createStore({
    loading: true,
    theme: singleTheme ? opts.theme : opts.themes.dark
  } as ICodeblockContext)

  onMount(async () => {
    setCDN(opts.cdnRoot);
    try {
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
    } catch (e) {
      console.error(e)
    }
  })

  if (opts.isDark) {
    const isDark = opts.isDark;
    createEffect(() => {
      setStore("theme", isDark() ? opts.themes.dark : opts.themes.light)
    })
  }

  return (<CodeblockContext.Provider value={store} children={props.children} />)
}


const getContent = async (props: {
  content: string | undefined;
  href: string | undefined;
  len: number | undefined;
}) => {
  console.debug("[solidjs-codeblock] content update")
  if (props.content) return props.content;
  try {
    return await (fetch(props.href as string).then(r => r.text()))
  } catch (e) {
    // TODO: show error message
    console.log(e)
  }
}

const Line = (len: number): JSXElement => [`ph-col-${len}`, `ph-col-${12 - len} empty`].map(c => <div class={c} />)
const Placeholder: Component<{ mode: string, contentLen: number, layout?: number[] }> = (props) => {
  const Items: JSXElement[] = [];
  const layout = Array(props.contentLen).fill(props.layout ?? [6, 2, 4, 8, 10, 12]).flat();

  let current = 0;
  while (current < props.contentLen) {
    Items[current] = Line(layout[current])
    current++;
  }

  return <div class={`cb-container ${props.mode}`}>
    <div class="ph-item">
      <div class="ph-col-12">
        <div class="ph-row" children={Items} />
      </div>
    </div>
  </div>
}

/** Main Codeblock Component props */
export interface ICodeblock {
  /** Raw text content */
  textContent?: string,
  /** URL pointing to an end point returning type text. */
  href?: string,
  /** Content length to render placeholder while downloading the content */
  contentLen?: number,
  /** Content Language */
  lang: Lang
}

export const Codeblock: ParentComponent<ICodeblock> = (props) => {
  console.debug("[solidjs-codeblock] new Codeblock()")
  const code = useCodeblockContext();
  const opts = createMemo(() => ({
    content: props.textContent,
    href: props.href,
    len: props.textContent ? props.textContent.split("\n").length : props.contentLen
  }));
  const [content] = createResource(opts, getContent)

  return (
    <Show when={!(code.loading || content.loading)}
      fallback={<Placeholder
        contentLen={opts().len ?? 5}
        mode={code.theme}
      />}
      children={<div
        class={`cb-container ${code.theme}`}
        innerHTML={code.parse(content() as string, props.lang)}
      />}
    />
  )
};
