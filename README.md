# Ziko-server

Provides server-side rendering with file-based routing for ZikoJS, ***featuring zero configuration client-side hydration.*** 

# Project Structure
```
ziko-ssr-app
   ├── src/
      ├── server.js
      ├── entry-server.js
      ├── entry-client.js
      ├── pages/
            ├── index.js 
   ├── index.html
   ├── package.json
    
```


# Config 

```js
// server.js
import { createServer } from "ziko-server/server";
createServer()
```

```js
// entry-server.js
import {defineServerEntry} from "ziko-server/entry-server";
export default defineServerEntry({
   pages : import.meta.glob("./pages/**/*{.js,.mdz}")
})
```
```js
// entry-client.js
import {EntryClient} from "ziko-server/entry-client";
EntryClient({
  pages : import.meta.glob("./pages/**/*{.js,.mdz}")
})
```

