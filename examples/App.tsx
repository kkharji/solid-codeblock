// @refresh reload
import { render } from 'solid-js/web';
import { ConfigProvider } from './config';
import "./App.scss"
import SimpleExample from './simple';
import Header from './components/header';
import CustomExample from './custom';
import GistExample from './gist';

const App = () => <>
  <Header />
  <SimpleExample />
  <CustomExample />
  <GistExample />
</>

render(() => (
  <>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </>
), document.body as HTMLElement);
