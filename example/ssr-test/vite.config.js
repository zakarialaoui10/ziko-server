import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    {
      name: 'virtual-entry',
      resolveId(id) {
        if (id === 'virtual:main') return id;
      },
      load(id) {
        if (id === 'virtual:main') {
          return `
          import "ziko-server/entry-client"
          `;
        }
      }
    }
  ]
});
