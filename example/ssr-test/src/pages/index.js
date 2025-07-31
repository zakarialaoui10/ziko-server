import {h1} from "ziko"
const App = () =>{
    return h1("Index...").style({color : "red"}).onPtrDown(()=>alert("Click"))
}
export default App