import Codeblock from "@codeblock/component"
import { createSignal } from "solid-js"
import Example from "@examples/components/example"
import { useConfig } from "./config"

const defaultContent = "export const Home = () => {\n\treturn <div>Welcome</div>\n}"
const altContent = "export const Login = () => {\n\treturn <input />\n}"
const [content, setContent] = createSignal(defaultContent)

const SwapContentButton = () =>
  <button
    class="swap-content-btn"
    textContent="Swap Content"
    onClick={() => setContent(content() === defaultContent ? altContent : defaultContent)}
  />

export default function SimpleExample() {
  const [config] = useConfig()
  return (<>
    <Example
      title="Simple"
      desc="Default behavior with dark/light mode"
      providerOpts={{
        langs: ["tsx"],
        isDark: () => config.isDark
      }}
      headerContent={
        <SwapContentButton />
      }>
      <Codeblock
        lang="tsx"
        textContent={content()}
      />
    </Example>
  </>)
}
