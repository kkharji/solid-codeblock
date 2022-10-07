import { createMemo, createResource, ParentComponent, Show } from "solid-js";
import { ICodeblock } from "./interface";
import { useCodeblockContext } from "./provider";
import "./view.scss"

let Fallback = () => <h1 class="font-medium text-3xl italic">Loading shiki library ....</h1>

const getContent = async ({ href, content }: { href?: string, content?: string }) =>
  content
    ? content as string
    : await fetch(href as string).then(r => r.text())

const getOpts = (props: ICodeblock) => createMemo(() => ({
  content: props.textContent,
  href: props.href,
  len: props.textContent ? props.textContent.split("\n").length : props.contentLen
}))

export const Codeblock: ParentComponent<ICodeblock> = (props) => {
  console.debug("[solidjs-codeblock] new Codeblock()")
  const code = useCodeblockContext();
  const [content] = createResource(getOpts(props), getContent)

  return (
    <Show when={!(code.loading || content.loading)} fallback={Fallback()}>
      <div class={`cb-container ${code.theme}`}
        innerHTML={code.parse(content() as string, props.lang)}
      />
    </Show>
  )
};

export default Codeblock
