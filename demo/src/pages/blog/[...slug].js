import {tags} from "ziko"


async function App(a){
    console.log({a})
    const api = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const res = await api.json()
    return tags.h1(res.title)

}

export default App
