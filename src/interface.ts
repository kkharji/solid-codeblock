import type { ILanguageRegistration, Lang, Theme } from "shiki";
import type { Accessor } from "solid-js"

/**
 * Provider Intialize Options
 */
export type ICodeblockProvider = {
  /**
   * Solid Signal that resolve to weather the theme is dark or light
   */
  isDarkAccessor: Accessor<boolean>
  /**
   * A list of themes to load upfront.
   *
   * Default to: `{dark: 'dark-plus', light: 'light-plus' }`
   */
  theme?: Record<"dark" | "light", Theme>;
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
