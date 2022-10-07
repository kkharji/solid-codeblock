import { CodeblockProvider, ICodeblockProvider } from "@codeblock";
import { FlowProps, JSXElement } from "solid-js";

export type ExampleProps = FlowProps<{
  providerOpts: ICodeblockProvider,
  title: string,
  desc: string,
  headerContent: JSXElement
}>;

export default function Example(props: ExampleProps) {
  return (
    <CodeblockProvider opts={props.providerOpts}>
      <div id={props.title.toLowerCase()}>
        <section>
          <h2 textContent={props.title} />
          {props.headerContent}
        </section>
        <p textContent={props.desc} />
        {props.children}
      </div>
    </CodeblockProvider >
  )
}
