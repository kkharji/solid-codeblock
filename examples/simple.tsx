import { useCodeblockContext } from "@codeblock/provider"
import { Component } from "solid-js"

export default () => {
  const code = useCodeblockContext()

  return (<>
    <h1>Simple X</h1>
  </>)
}
