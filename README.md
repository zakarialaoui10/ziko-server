> [!NOTE]  
> This project is part of the [ZikoJS](https://github.com/zakarialaoui10/ziko.js) ecosystem.

# Ziko-server

Provides server-side rendering with file-based routing for ZikoJS, ***featuring zero configuration client-side hydration.*** 

# Features 
- Server Side Rendering 
- Client Side Hydration with no additional config 
- File Based Routing 

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

# ⭐️ Show your support

If you appreciate the project, kindly demonstrate your support by giving it a star!<br>

[![Star](https://img.shields.io/github/stars/zakarialaoui10/mdzjs?style=social)](https://github.com/zakarialaoui10/mdzjs)
<!--## Financial support-->
# License 
This projet is licensed under the terms of MIT License 
<img src="https://img.shields.io/github/license/zakarialaoui10/ziko-server?color=rgb%2820%2C21%2C169%29" width="100" align="right">