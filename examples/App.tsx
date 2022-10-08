// @refresh reload
import { render } from 'solid-js/web';
import { ConfigProvider } from './config';
import "./App.scss"
import SimpleExample from './simple';
import Header from './components/header';
import CustomExample from './custom';

const App = () => <>
  <Header />
  <SimpleExample />
  <CustomExample />
</>

render(() => (
  <>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </>
), document.body as HTMLElement);
