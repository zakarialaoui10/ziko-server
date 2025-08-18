import {tags} from "ziko"
// import {pages} from "virtual:generated-pages"
// console.log({pages})
const App = () =>{
    return tags.h1("Index...").style({color : "red"}).onPtrDown(()=>alert("Click"))
}
export default App