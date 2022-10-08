import Codeblock from "@codeblock/Codeblock"
import Example from "@examples/components/example"
import { useConfig } from "./config"

export default function GistExample() {
  const [config] = useConfig()
  return (
    <Example
      title="Gist"
      desc="Load code snippet from gist url"
      providerOpts={{
        isDark: () => config.isDark,
        themes: {
          dark: "github-dark-dimmed", light: "github-light"
        },
        langs: ["rust"]
      }}
    >
      <Codeblock
        lang="rust"
        href="https://gist.githubusercontent.com/kkharji/4acfd339024edcc14d8b64a895543d0f/raw/6d2d8663816a4cf620147fe1cbcd4a7dd9378ec6/fd.rs"
        contentLen={28}
      />
    </Example>
  )
}
