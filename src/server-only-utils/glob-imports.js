import fg from 'fast-glob';
import path from 'path';
import { pathToFileURL } from 'url';
import { customPath } from '../utils/custom-path.js';

export async function globImports(pattern = './src/pages/**/*.{js,ts,jsx,tsx,mdz}', { cwd = process.cwd() , root = "./pages/"} = {}) {
  const files = await fg(pattern, { cwd });
  const modules = {};

  for (const file of files) {
    const absPath = path.resolve(cwd, file);
    const fileUrl = pathToFileURL(absPath).href;
    const key = './' + file.replace(/\\/g, '/');
    modules[key] = () => import(/* @vite-ignore */fileUrl);
  }

  const routes = Object.keys(modules);
  
  const pairs = {};
  for (let i = 0; i < routes.length; i++) {
      const module = await modules[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [customPath(routes[i], root)]: component });
  }  
  return pairs
}
