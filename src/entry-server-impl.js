import {
  customPath,
  routesMatcher,
  dynamicRoutesParser,
  isDynamic,
} from "./utils/index.js";
import { renderToString } from "./server-only-utils/renderToString.js";
import {pages} from "virtual:routes-map"
// console.log({pagesssr: pages})

export function EntryServer() {
  // const pages = import.meta.glob("/src/pages/**/*{.js,.mdz}") 
  return async function render(path) {
    const routes = Object.keys(pages);
    const root = "./pages/";
    const pairs = {};
    for (let i = 0; i < routes.length; i++) {
      const module = await pages[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [customPath(routes[i], root)]: component });
    }
    let [mask, callback] = Object.entries(pairs).find(([route]) =>
      routesMatcher(route, `/${path}`),
    );
    console.log({mask, callback})

    let UIElement;
    if (isDynamic(mask)) {
      const params = dynamicRoutesParser(mask, `/${path}`);
      UIElement = callback.call(this, params);
    } 
    else UIElement = await callback();

    const html = renderToString(UIElement);

    // const OutDirPath = `dist${mask}`
    // console.log(OutDirPath)
    // const FilePath = join(OutDirPath, 'index.html');
    // const htmlContent = `<!DOCTYPE html><html><body><h1>${html}</h1></body></html>`;
    // fs.mkdir(OutDirPath,{recursive : true})
    // fs.writeFile(FilePath, htmlContent, 'utf8');


    return {
      // head,
      html,
    };
  };
}
