import { useConfig } from './../config';

export default () => {
  const [config, setConfig] = useConfig()!;
  return (
    <header>
      <h1 textContent="Solidjs Codeblock" />
      <button
        innerHTML={`Toggle <b>${config.isDark ? "light" : "dark"} mode</b>`}
        onClick={() => setConfig("isDark", !config.isDark)} />
    </header>
  );
};
