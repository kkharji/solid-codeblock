import Codeblock from "@codeblock/Codeblock"
import Example from "@examples/components/example"
import { createSignal } from "solid-js"
import { useConfig } from "./config"

const defaultURL = "https://gist.githubusercontent.com/codahale/6047209/raw/2109b56b9571deb8a6f98b362fc14c6d75092835/gistfile1.rs"
const altURL = "https://gist.githubusercontent.com/eightbitraptor/78ed1ab4b25b55e73416/raw/688be636f13f62100abdb63847e10374774aee4e/main.rs"

const [url, setURL] = createSignal(defaultURL)
const SwapContentButton = () =>
  <button
    class="swap-content-btn"
    textContent="Swap Content"
    onClick={() => setURL(url() === defaultURL ? altURL : defaultURL)}
  />

export default function GistExample() {
  const [config] = useConfig()
  return (
    <Example
      title="Gist"
      desc="Load code snippet from gist url"
      providerOpts={{
        isDark: () => config.isDark,
        themes: {
          dark: "github-dark", light: "github-light"
        },
        langs: ["rust"]
      }}
      headerContent={<SwapContentButton />}
    >
      <Codeblock lang="rust" href={url()} contentLen={16} />
    </Example>
  )
}
