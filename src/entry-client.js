import {
    customPath,
    routesMatcher,
    dynamicRoutesParser,
    isDynamic,
  } from "./utils/index.js";
// const pages = import.meta.glob("./pages/**/*{.js,.mdz}");
export function EntryClient({pages}={}){
  addEventListener("load", (async () => {
    const routes = Object.keys(pages);
    const root = "./pages/";
    const pairs = {};
    for (let i = 0; i < routes.length; i++) {
      const module = await pages[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [customPath(routes[i], root)]: component });
    }
    async function hydrate(path) {
      // console.log("client");
      let [mask, callback] = Object.entries(pairs).find(([route]) =>
        routesMatcher(route, `/${path}`),
      );
      // console.log({ mask, callback });
      let UIElement;
      if (isDynamic(mask)) {
        const params = dynamicRoutesParser(mask, `/${path}`);
        // console.log({ params });
        UIElement = callback.call(this, params);
      } 
      else UIElement = await callback();
      document.body.replaceWith(UIElement.element);
    }
    hydrate(location.pathname.slice(1));
  }))
}

// const pages = import.meta.glob("./pages/**/*{.js,.mdz}")
// console.log(pages)
