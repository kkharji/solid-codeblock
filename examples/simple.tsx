import Codeblock from "@codeblock/view"
import { createSignal } from "solid-js"
import ExampleHeader from "./components/example-header"

const defaultContent = "export const Home = () => {\n\treturn <div>Welcome</div>\n}"
const altContent = "export const Login = () => {\n\treturn <input />\n}"
const [content, setContent] = createSignal(defaultContent)

export default () => {
  return (<>
    <ExampleHeader title="Simple">
      <button
        class="p-2.5 py-1 rounded-xl bg-gray-600 hover:bg-gray-400 text-gray-50 text-sm"
        textContent="Swap Content"
        onClick={() => setContent(content() === defaultContent ? altContent : defaultContent)}
      />
    </ExampleHeader>
    <Codeblock
      lang="tsx"
      textContent={content()}
    />
  </>)
}
