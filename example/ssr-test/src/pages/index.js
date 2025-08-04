import {h1} from "ziko"
import {pages} from "virtual:generated-pages"
console.log({pages})
const App = () =>{
    return h1("Index...").style({color : "red"}).onPtrDown(()=>alert("Click"))
}
export default App