import {tags, Random} from "ziko"
console.log(Ziko)
export const head = {
    title : 'Ziko Server Home Page',
}
export const prerender = false;
const App = () =>{
    // console.log({ziko})
    // if(req.locals) return tags.h1(req.locals.user)
    const ui = tags.h1("Index...").style({color : "red"}).onPtrDown(e=>e.target.style({color : Random.color()}))
    // console.log(__Ziko__)
    return ui
}


export default App