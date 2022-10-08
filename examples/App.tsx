// @refresh reload
import { render } from 'solid-js/web';
import { ConfigProvider } from './config';
import "./App.scss"
import SimpleExample from './simple';
import Header from './components/header';
import CustomExample from './custom';
import { createSignal, lazy, Show } from 'solid-js';
let GistExample = lazy(() => import("./gist"))

const [show, setShow] = createSignal(false);
const App = () => <>
  <Header />
  <SimpleExample />
  <CustomExample />
  <Show when={show()}
    fallback={<button
      class='swap-content-btn'
      textContent={"Show"}
      onClick={() => setShow(true)}
    />}>
    <GistExample />
  </Show>

</>

render(() => (
  <>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </>
), document.body as HTMLElement);
