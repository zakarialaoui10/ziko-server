import {tags, Random} from "ziko"
export const head = {
    title : 'Ziko Server Home Page',
}
export const prerender = false;
const App = () =>{
    return tags.h1("Index...").style({color : "red"}).onPtrDown(e=>e.target.style({color : Random.color()}))
}
export default App