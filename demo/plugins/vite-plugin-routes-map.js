// import fg from 'fast-glob';

// export default function VitePluginRoutesMap({ pattern = 'src/pages/**/*.{js,mdz}' } = {}) {
//   let resolvedConfig;

//   return {
//     name: 'vite-plugin-routes-map',
//     enforce: 'pre',
//     configResolved(config) {
//       resolvedConfig = config;
//     },
//     async load(id) {
//       if (id === 'virtual:routes-map') {
//         const files = await fg(pattern);
//         const entries = files.map(file => {
//           const path = '/' + file.replace(/\\/g, '/');
//           return `"${path}": () => import("${path}")`;
//         });

//         return `export const pages = {\n  ${entries.join(',\n  ')}\n};`;
//       }
//     },
//     resolveId(id) {
//       if (id === 'virtual:routes-map') return id;
//     }
//   };
// }


import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

export default function VitePluginRoutesMap({
  pattern = 'src/pages/**/*.{js,mdz}',
  outputFile = './generated-routes-map.js', // real file path
} = {}) {
  return {
    name: 'vite-plugin-routes-map',
    enforce: 'pre',

    async buildStart() {
      // Generate the real routes map file on disk before build
      const files = await fg(pattern);
      const entries = files.map(file => {
        const routePath = '/' + file.replace(/\\/g, '/');
        return `  "${routePath}": () => import("${routePath}")`;
      });
      const content = `export const pages = {\n${entries.join(',\n')}\n};\n`;

      // Ensure directory exists
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
      fs.writeFileSync(outputFile, content);
    },

    resolveId(id) {
      if (id === 'virtual:routes-map') {
        // Resolve virtual import to real file path
        return path.resolve(outputFile);
      }
    },

    load(id) {
      if (id === path.resolve(outputFile)) {
        // Let Vite load the real file normally
        return null;
      }
    }
  };
}
