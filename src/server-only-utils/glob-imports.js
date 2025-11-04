import fg from 'fast-glob';
import path from 'path';
import { pathToFileURL } from 'url';
import { customPath } from '../utils/custom-path.js';

export async function globImports(pattern = './src/pages/**/*.{js,ts,jsx,tsx,mdz}', { cwd = process.cwd() , root = "./pages/"} = {}) {
  const files = await fg(pattern, { cwd });
  // console.log({files})
  const modules = {};

  for (const file of files) {
    const absPath = path.resolve(cwd, file);
    const fileUrl = pathToFileURL(absPath).href;
    const key = './' + file.replace(/\\/g, '/');
    modules[key] = () => import(/* @vite-ignore */fileUrl);
  }

  const routes = Object.keys(modules);

  // console.log('from server-only-utils/glob-imports')
  

  
  const pairs = {};
  for (let i = 0; i < routes.length; i++) {
      const module = await modules[routes[i]]();
      let isComponent = true;
      if(routes[i].includes('.json')){
        isComponent = false;
        routes[i] = routes[i].replace('.json', '')
      }
      const handler = await module.default;
      Object.assign(pairs, { 
        [customPath(routes[i], root)]: {
          handler,
          prerender : false,
          hydration : false,
          isComponent,
        } });
  }  

  // console.log({modules, routes, pairs})
  return pairs
}
