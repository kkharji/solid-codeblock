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

const getContent = async (props: ReturnType<ReturnType<typeof getOpts>>) => {
  console.debug("[solidjs-codeblock] content update")
  if (props.content) {

    return props.content;
  }
  try {
    return (await fetch(props.href as string, { mode: "cors" }).then(r => r.text()))
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
