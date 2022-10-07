import { createContext, createEffect, ParentProps, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";

const CONFIG_KEY = "docs_config";
const MAX_AGE = 60 * 60 * 24 * 365;

export type Config = {
  isDark: boolean;
}

const defaultConfig: Config = {
  isDark: true
}

export type IConfigContext = [config: Config, setConfig: SetStoreFunction<Config>]
export const ConfigContext = createContext<[config: Config, setConfig: SetStoreFunction<Config>]>();
export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = (props: ParentProps<{}>) => {
  const cookies = parseCookie(document.cookie);
  const [config, setConfig] = createStore(cookies[CONFIG_KEY] ? JSON.parse(cookies[CONFIG_KEY]) as Config : defaultConfig);

  createEffect(() => {
    const [add, remove] = config.isDark ? ["dark", "light"] : ["light", "dark"];
    document.cookie = `${CONFIG_KEY}=${JSON.stringify(config)}; SameSite=Lax; Secure; max-age=${MAX_AGE}; path=/`;
    document.documentElement.classList.add(add);
    document.documentElement.classList.remove(remove);
  });

  return <ConfigContext.Provider
    value={[config, setConfig]}
    children={props.children}
  />
};


export function parseCookie(str: string): Record<string, string> {
  if (typeof str !== "string") throw new TypeError("expect string as first arg");

  var obj: Record<string, string> = {};
  var pairs = str.split(";");

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var index = pair.indexOf("=");

    // skip things that don't look like key=value
    if (index < 0) continue;

    var key = pair.substring(0, index).trim();
    if (obj[key] !== undefined) continue

    var val = pair.substring(index + 1, pair.length).trim();

    // quoted values
    if (val[0] === '"') val = val.slice(1, -1);

    try { obj[key] = decodeURIComponent(val) as string; } catch (_) { }
  }

  return obj;
}
