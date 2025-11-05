import {tags, Random} from "ziko"
const App = () =>{
    return tags.h1("Index...").style({color : "red"}).onPtrDown(e=>e.target.style({color : Random.color()}))
}
export default App