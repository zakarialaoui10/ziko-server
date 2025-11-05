import {tags, Suspense} from "ziko"
const ui=async ()=>{
    const api = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const res = await api.json()
    return tags.h1(res.title)
}
const App = async () =>{
    return Suspense(
        tags.h1("Waiting ..."), ui
    )
}

export default App