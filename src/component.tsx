import { createResource, ParentComponent, Show } from "solid-js";
import { ICodeblock } from "./interface";
import { useCodeblockContext } from "./provider";
import "./view.scss"

let Fallback = () => <h1 class="font-medium text-3xl italic">Loading shiki library ....</h1>

const getOpts = (props: ICodeblock) => () => ({
  content: props.textContent,
  href: props.href,
  len: props.textContent ? props.textContent.split("\n").length : props.contentLen
})

const getContent = async (props: ReturnType<ReturnType<typeof getOpts>>) => {
  console.debug("[solidjs-codeblock] content update")
  return props.content
    ? props.content
    : await fetch(props.href as string).then(r => r.text())
}

export const Codeblock: ParentComponent<ICodeblock> = (props) => {
  console.debug("[solidjs-codeblock] new Codeblock()")
  const code = useCodeblockContext();
  const opts = getOpts(props);
  const [content] = createResource(opts, getContent)

  return (
    <Show when={!(code.loading || content.loading)} fallback={Fallback()}>
      <div class={`cb-container ${code.theme}`}
        innerHTML={code.parse(content() as string, props.lang)}
      />
    </Show>
  )
};

export default Codeblock
