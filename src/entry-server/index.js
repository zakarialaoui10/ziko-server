import {
  customPath,
  routesMatcher,
  dynamicRoutesParser,
  isDynamic,
} from "../utils/index.js";
import { 
  renderToString,
  globImports
 } from "../server-only-utils/index.js";

export function EntryServer() {
  return async function render(path) {
    if(path.endsWith("/")) path = path.slice(0, -1);

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


    return {
      // head,
      html,
    };
  };
}
