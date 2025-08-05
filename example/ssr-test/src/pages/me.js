import {h1} from "ziko"


async function App(){
    const api = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const res = await api.json()
    return h1(res.title)

}

export default App
