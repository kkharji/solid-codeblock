import { createResource, ParentComponent, Show } from "solid-js";
import { ICodeblock } from "@codeblock/interface";
import Placeholder from "@codeblock/Placeholder";
import { useCodeblockContext } from "@codeblock/provider";
import "./Codeblock.scss"


const getOpts = (props: ICodeblock) => () => ({
  content: props.textContent,
  href: props.href,
  len: props.textContent ? props.textContent.split("\n").length : props.contentLen
})
export const delay = <T,>
  (fn: () => T, delay = 700) => new Promise<T>((res) => setTimeout(() => res(fn()), delay));

const getContent = async (props: ReturnType<ReturnType<typeof getOpts>>) => {
  console.debug("[solidjs-codeblock] content update")
  if (props.content) {

    return props.content;
  }
  try {
    return delay(() => (fetch(props.href as string).then(r => r.text())), 1000)
  } catch (e) {
    // TODO: show error message
    console.log(e)
  }
}

export const Codeblock: ParentComponent<ICodeblock> = (props) => {
  console.debug("[solidjs-codeblock] new Codeblock()")
  const code = useCodeblockContext();
  const opts = getOpts(props);
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

export default Codeblock
