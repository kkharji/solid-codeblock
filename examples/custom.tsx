import { Codeblock } from "../src"
import Example from "./components/example"

const content = "export const Login = () => {\n\treturn <input />\n}"

export default function CustomExample() {
  return (<>
    <Example
      title="Custom"
      desc="Signle Theme name provided and no dark/light mode binding"
      providerOpts={{
        theme: "github-light",
        langs: ["tsx"]
      }}
    >
      <Codeblock lang="tsx" textContent={content} />
    </Example>

  </>)
}
