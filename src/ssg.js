// import fg from 'fast-glob';
// import path from "path"
// import { pathToFileURL } from 'url';
// import { renderToString } from './utils/renderToString.js';
// export async function buildSsg(...routes){
//   const files = await fg(['./src/pages/**/*.{js,mdz}'], {
//       onlyFiles: true 
//     }
//   );
//   const Modules = [];
//   const HTML = []
//   for (const file of files) {
//     Modules.push(await import(pathToFileURL(file)))
//   }

//   console.log(renderToString(Modules[0].default()))
// }
