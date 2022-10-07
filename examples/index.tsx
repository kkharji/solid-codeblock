// @refresh reload
import { App } from '@examples/App';
import { render } from 'solid-js/web';
import { ConfigProvider } from './config';

render(() => (
  <>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </>
), document.body as HTMLElement);
