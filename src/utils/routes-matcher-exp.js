function routesMatcher(mask, route) {
  const maskSegments = mask.split('/').filter(Boolean);
  const routeSegments = route.split('/').filter(Boolean);

  let i = 0, j = 0;

  while (i < maskSegments.length && j < routeSegments.length) {
    const maskSegment = maskSegments[i];
    const routeSegment = routeSegments[j];

    // Catch-all segment `[...param]`
    if (maskSegment.startsWith('[...') && maskSegment.endsWith(']')) {
      return true; // matches all remaining
    }

    // Optional `[param]?`
    if (maskSegment.startsWith('[') && maskSegment.endsWith(']?')) {
      const paramName = maskSegment.slice(1, -2);
      // optional: if it matches, consume; if not, skip
      if (routeSegment) j++;
      i++;
      continue;
    }

    // Dynamic `[param]` or `:param`
    if (maskSegment.startsWith(':') || (maskSegment.startsWith('[') && maskSegment.endsWith(']'))) {
      i++; j++;
      continue;
    }

    // Must match static segment
    if (maskSegment !== routeSegment) return false;

    i++; j++;
  }

  // Handle catch-all `[...param]` at end
  const last = maskSegments[maskSegments.length - 1];
  if (last?.startsWith('[...') && last.endsWith(']')) return true;

  // Handle optional parameters at the end
  while (i < maskSegments.length) {
    const seg = maskSegments[i];
    if (seg.endsWith(']?')) {
      i++;
      continue;
    }
    return false;
  }

  return i === maskSegments.length && j === routeSegments.length;
}


function dynamicRoutesParser(mask, route) {
  const maskSegments = mask.split('/').filter(Boolean);
  const routeSegments = route.split('/').filter(Boolean);
  const params = {};

  let i = 0, j = 0;

  while (i < maskSegments.length && j < routeSegments.length) {
    const maskSegment = maskSegments[i];
    const routeSegment = routeSegments[j];

    // Catch-all `[...param]`
    if (maskSegment.startsWith('[...') && maskSegment.endsWith(']')) {
      const paramName = maskSegment.slice(4, -1);
      params[paramName] = routeSegments.slice(j).join('/');
      break;
    }

    // Optional `[param]?`
    if (maskSegment.startsWith('[') && maskSegment.endsWith(']?')) {
      const paramName = maskSegment.slice(1, -2);
      if (routeSegment) {
        params[paramName] = routeSegment;
        j++;
      }
      i++;
      continue;
    }

    // Dynamic `[param]` or `:param`
    if (maskSegment.startsWith(':')) {
      const paramName = maskSegment.slice(1);
      params[paramName] = routeSegment;
    } else if (maskSegment.startsWith('[') && maskSegment.endsWith(']')) {
      const paramName = maskSegment.slice(1, -1);
      params[paramName] = routeSegment;
    } else if (maskSegment !== routeSegment) {
      return {}; // mismatch
    }

    i++; j++;
  }

  return params;
}


function isDynamic(path) {
  // Match :param, [param], [param]?, and [...param]
  const DynamicPattern = /(:\w+|\[\.\.\.\w+\]|\[\w+\]\??)/;
  return DynamicPattern.test(path);
}

export { routesMatcher, dynamicRoutesParser, isDynamic };



// DEMO

routesMatcher('/user/[id]?', '/user');        // true  (id optional)
routesMatcher('/user/[id]?', '/user/42');     // true
routesMatcher('/blog/[...slug]', '/blog/a/b'); // true
routesMatcher('/blog/[id]', '/blog');         // false
routesMatcher('/product/:id', '/product/99'); // true

dynamicRoutesParser('/user/[id]?', '/user');
// 👉 {}

dynamicRoutesParser('/user/[id]?', '/user/42');
// 👉 { id: "42" }

dynamicRoutesParser('/blog/[...slug]', '/blog/2025/oct/post');
// 👉 { slug: "2025/oct/post" }

dynamicRoutesParser('/product/[category]/[id]?', '/product/electronics');
// 👉 { category: "electronics" }
