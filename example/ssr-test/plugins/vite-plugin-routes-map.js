import fg from 'fast-glob';

export default function VitePluginRoutesMap({ pattern = 'src/pages/**/*.{js,mdz}' } = {}) {
  let resolvedConfig;

  return {
    name: 'vite-plugin-routes-map',
    enforce: 'pre',
    configResolved(config) {
      resolvedConfig = config;
    },
    async load(id) {
      if (id === 'virtual:routes-map') {
        const files = await fg(pattern);
        const entries = files.map(file => {
          const path = '/' + file.replace(/\\/g, '/');
          return `"${path}": () => import("${path}")`;
        });

        return `export const pages = {\n  ${entries.join(',\n  ')}\n};`;
      }
    },
    resolveId(id) {
      if (id === 'virtual:routes-map') return id;
    }
  };
}
