import {
  customPath,
  routesMatcher,
  dynamicRoutesParser,
  isDynamic,
} from "./utils/index.js";
import { renderToString } from "./server-only-utils/renderToString.js";
import { globImports } from "ziko-server/server-only-utils";

export function EntryServer() {
  return async function render(path) {

    const pairs = await globImports("./src/pages/**/*{.js,.mdz}")
    let [mask, callback] = Object.entries(pairs).find(([route]) =>
      routesMatcher(route, `/${path}`),
    );
    // console.log({mask, callback})

    let UIElement;
    if (isDynamic(mask)) {
      const params = dynamicRoutesParser(mask, `/${path}`);
      UIElement = await callback.call(this, params);
    } 
    else UIElement = await callback();

    const html = renderToString(UIElement);

    // console.log({html})

    // const OutDirPath = `dist2${mask}`
    // console.log({OutDirPath})
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
