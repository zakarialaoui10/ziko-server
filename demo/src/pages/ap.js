import {tags} from "ziko"


async function App(){
    const api = await fetch('http://localhost:5173/api/a/')
    const res = await api.json()
    return tags.h1(res.a)

}

export default App
