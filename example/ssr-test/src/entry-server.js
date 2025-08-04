import {EntryServer} from "ziko-server/entry-server";
export default () => EntryServer({
    pages : import.meta.glob("/src/pages/**/*{.js,.mdz}") 
})