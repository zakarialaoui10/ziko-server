import {
    normalize_path,
    routesMatcher,
    dynamicRoutesParser,
    isDynamic,
  } from "../utils/index.js";

export function EntryClient({base = '', pages}={}){
  if(import.meta.env.DEV) pages = import.meta.glob("/src/pages/**/*{.js,.mdz}")
  addEventListener("load", (async () => {
      pages = import.meta.glob("/src/pages/**/*{.js,.mdz}")
    // if(import.meta.env.PROD) pages = (await import(/* @vite-ignore */`${base}/.generated-routes.js`)).pages
    const routes = Object.keys(pages);
    const root = "./pages/";
    const pairs = {};
    const _pairs = {}
    for (let i = 0; i < routes.length; i++) {
      const module = await pages[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [normalize_path(routes[i], root)]: component });
      Object.assign(_pairs, { [normalize_path(routes[i], root)] : await module})
    }
    async function hydrate(path) {
      if(path.endsWith("/")) path = path.slice(0, -1);
      let [mask, callback] = Object.entries(pairs).find(([route]) =>
        routesMatcher(route, `/${path}`),
      );
      let UIElement;
      if (isDynamic(mask)) {
        const params = dynamicRoutesParser(mask, `/${path}`);
        UIElement = (await callback.call(this, params)).unrender();
      } 
      else UIElement = await callback().unrender();
      // UIElement.unrender()
      // document.body.innerHTML = ""
      // document.body.append(UIElement.element)
      const ElementsNeedsHydration = [...document.querySelectorAll('[data-hydration-index]')]
      ElementsNeedsHydration.forEach(element => {
        element.replaceWith(__Ziko__.__HYDRATION__.store.get(+element.dataset.hydrationIndex)().element)
      }
      )
    }  
    hydrate(location.pathname.slice(1));
  }))
}
