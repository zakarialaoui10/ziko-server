import {
  customPath,
  // routesMatcher,
  dynamicRoutesParser,
  isDynamic,
} from "../utils/index.js";
import { 
  renderToString,
  globImports
 } from "../server-only-utils/index.js";

 import { 
  routesMatcher,
  dynamicRoutesParser,
  isDynamic
 } from "../utils/routes-matcher-exp.js";

export function EntryServer() {
  return async function render(path) {
    if(path.endsWith("/")) path = path.slice(0, -1);

    const pairs = await globImports("./src/pages/**/*{.js,.mdz}")
    let [mask, callback] = Object.entries(pairs).find(([route]) =>
      routesMatcher(route, `/${path}`),
    );
    console.log({pairs})
    // console.log({mask, callback})

    let UIElement;
    if (isDynamic(mask)) {
      const params = dynamicRoutesParser(mask, `/${path}`);
      console.log({params})
      UIElement = await callback.handler.call(this, params);
    } 
    else UIElement = await callback.handler();

    const html = renderToString(UIElement);


    return {
      // head,
      html,
    };
  };
}
