import { CodeblockProvider, ICodeblockProvider } from "../../src";
import { JSXElement, ParentProps } from "solid-js";

export type ExampleProps = ParentProps<{
  providerOpts: ICodeblockProvider,
  title: string,
  desc: string,
  headerContent?: JSXElement
}>;

export default function Example(props: ExampleProps) {
  return (
    <CodeblockProvider opts={props.providerOpts}>
      <div class="example" id={props.title.toLowerCase()}>
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
