import { FlowProps } from "solid-js";

export default function ExampleHeader(props: FlowProps<{ title: string }>) {
  return <section class="flex gap-3 flex-row my-2 bg-gray-300 dark:bg-gray-800 p-2 rounded-2xl mb-3">
    <h2 class="flex-1 p-1" textContent={props.title} />
    {props.children}
  </section>
}
