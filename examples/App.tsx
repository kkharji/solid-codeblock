// @refresh reload
import { render } from 'solid-js/web';
import { ConfigProvider } from './config';
import "./App.scss"
import SimpleExample from './simple';
import Header from './components/header';

const App = () => <>
  <Header />
  <SimpleExample />
</>

render(() => (
  <>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </>
), document.body as HTMLElement);
