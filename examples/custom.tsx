import Codeblock from "@codeblock/component"
import { createSignal } from "solid-js"
import Example from "@examples/components/example"

const defaultContent = "export const Home = () => {\n\treturn <div>Welcome</div>\n}"
const altContent = "export const Login = () => {\n\treturn <input />\n}"
const [content, setContent] = createSignal(defaultContent)

const SwapContentButton = () =>
  <button
    class="swap-content-btn"
    textContent="Swap Content"
    onClick={() => setContent(content() === defaultContent ? altContent : defaultContent)}
  />

export default function CustomExample() {
  return (<>
    <Example
      title="Custom"
      desc="Signle theme name provided and no dark/light mode binding"
      providerOpts={{
        theme: "github-dark",
        langs: ["tsx"]
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
