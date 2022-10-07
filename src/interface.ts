import type { ILanguageRegistration, Lang, Theme } from "shiki";
import type { Accessor } from "solid-js"

/**
 * Provider Intialize Options
 */
export type ICodeblockProvider = {
  /**
   * Solid Signal that resolve to weather the theme is dark or light.
   *
   * This is required to be set in order to have a reactive codeblock that changes based on current theme
   */
  isDark?: Accessor<boolean>
  /**
   * A map of dark/light themes to load upfront.
   *
   * Default to: `{}`
   */
  themes?: Record<"dark" | "light", Theme>;

  /**
   * A signle theme to load
   *
   * Default to: `dark-plus`
   */
  theme?: Theme;
  /**
   * A list of languages to load upfront.
   *
   * Default to all the bundled languages.
   */
  langs?: (Lang | ILanguageRegistration)[];

  /**
   * Where to look for shiki runtime files
   *
   * Default: https://unpkg.com/shiki/
   */
  ShikiSDNRoot?: string
};


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
}


/**
 * Main Codeblock Component props
 */
export interface ICodeblock {
  /**
   * Raw text content
   */
  textContent?: string,
  /**
   * URL pointing to an end point returning type text.
   */
  href?: string,
  /**
   * Content length to render placeholder while downloading the content
   */
  contentLen?: number,
  /**
   * Content Language
   */
  lang: Lang
}
