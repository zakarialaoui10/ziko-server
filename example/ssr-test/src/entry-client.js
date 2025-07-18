// import {EntryClient} from "ziko-server/entry-client";
// EntryClient({
//   pages : import.meta.glob("./pages/**/*{.js,.mdz}")
// })

const pages = import.meta.glob("./pages/**/*{.js,.mdz}")
console.log(pages)