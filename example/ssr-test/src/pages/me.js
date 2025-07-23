import {h1, Suspense} from "ziko"
const ui=async ()=>{
    const api = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const res = await api.json()
    return h1(res.title)
}

async function UI2(){
    const api = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const res = await api.json()
    return h1(res.title)

}
const App = async () =>{
    return Suspense(
        h1("Me"), ui
    )
}
export default App
// export default UI2