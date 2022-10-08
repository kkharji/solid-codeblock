import { Component, JSXElement } from "solid-js";
import "./Placeholder.scss";


const Line = (len: number): JSXElement => {
  return <>
    <div class={`ph-col-${len}`} />
    <div class={`ph-col-${12 - len} empty`} />
  </>;
}

const Placeholder: Component<{ mode: string, contentLen: number, layout?: number[] }> = (props) => {
  const Items: JSXElement[] = [];
  const layout = Array(props.contentLen).fill(props.layout ?? [6, 2, 4, 8, 10, 12]).flat();

  let current = 0;
  while (current < props.contentLen) {
    Items[current] = Line(layout[current])
    current++;
  }

  return <div class={`cb-container ${props.mode}`}>
    <div class="ph-item">
      <div class="ph-col-12">
        <div class="ph-row" children={Items} />
      </div>
    </div>
  </div>
}

export default Placeholder;
