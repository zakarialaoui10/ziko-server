
/*
  Project: ziko-server
  Author: Zakaria Elalaoui
  Date : Thu Jan 09 2025 18:52:27 GMT+0100 (UTC+01:00)
  Git-Repo : https://github.com/zakarialaoui10/ziko-lottie.js
  Released under MIT License
*/

function customPath(inputPath, root = './src/pages', extensions = ['js', 'ts']) {
    if(root.at(-1)==="/") root = root.slice(0, -1);
    const normalizedPath = inputPath.replace(/\\/g, '/').replace(/\[(\w+)\]/g, '$1/:$1');
    const parts = normalizedPath.split('/');
    const rootParts = root.split('/');
    const rootIndex = parts.indexOf(rootParts[rootParts.length - 1]);
    if (rootIndex !== -1) {
        const subsequentParts = parts.slice(rootIndex + 1);
        const lastPart = subsequentParts[subsequentParts.length - 1];
        const isIndexFile = lastPart === 'index.js' || lastPart === 'index.ts';
        const hasValidExtension = extensions.some(ext => lastPart === `.${ext}` || lastPart.endsWith(`.${ext}`));
        if (isIndexFile) {
            return '/' + (subsequentParts.length > 1 ? subsequentParts.slice(0, -1).join('/') : '');
        }
        if (hasValidExtension) {
            return '/' + subsequentParts.join('/').replace(/\.(js|ts)$/, '');
        }
    }
    return '';
 }

function routesMatcher(mask, route) {
    const maskSegments = mask.split('/');
    const routeSegments = route.split('/');
    if (maskSegments.length !== routeSegments.length) {
        return false;
    }
    for (let i = 0; i < maskSegments.length; i++) {
        const maskSegment = maskSegments[i];
        const routeSegment = routeSegments[i];
        if (maskSegment.startsWith(':')) {
            continue;
        } else if (maskSegment !== routeSegment) {
            return false;
        }
    }    
    return true;
}
function dynamicRoutesParser(mask, route) {
    const maskSegments = mask.split('/');
    const routeSegments = route.split('/');
    const params = {};
    if (maskSegments.length !== routeSegments.length) {
        return params; 
    }
    for (let i = 0; i < maskSegments.length; i++) {
        const maskSegment = maskSegments[i];
        const routeSegment = routeSegments[i];
        if (maskSegment.startsWith(':')) {
            const paramName = maskSegment.slice(1); 
            params[paramName] = routeSegment;
        } else if (maskSegment !== routeSegment) {
            return {};
        }
    }
    return params;
}

function isDynamic(path) {
    const DynamicPattern = /:\w+/;    
    return DynamicPattern.test(path);
  }

// // Example usage:
// const mask = "app/lang/:lang/id/:id";
// const route = "app/lang/en/id/7";
// console.log(dynamicRoutesParser(mask, route)); // Should return { lang: "en", id: "7" }

// const pages = import.meta.glob("./pages/**/*{.js,.mdz}");
function EntryClient({pages}={}){
  addEventListener("load", (async () => {
    const routes = Object.keys(pages);
    const root = "./pages/";
    const pairs = {};
    for (let i = 0; i < routes.length; i++) {
      const module = await pages[routes[i]]();
      const component = await module.default;
      Object.assign(pairs, { [customPath(routes[i], root)]: component });
    }
    function hydrate(path) {
      console.log("client");
      let [mask, callback] = Object.entries(pairs).find(([route]) =>
        routesMatcher(route, `/${path}`),
      );
      console.log({ mask, callback });
      let UIElement;
      if (isDynamic(mask)) {
        const params = dynamicRoutesParser(mask, `/${path}`);
        console.log({ params });
        UIElement = callback.call(this, params);
      } else UIElement = callback();
      document.body.replaceWith(UIElement.element);
    }
    hydrate(location.pathname.slice(1));
  }));
}

export { EntryClient };
