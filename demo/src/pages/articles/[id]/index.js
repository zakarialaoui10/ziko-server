// import {tags.h1, Suspense} from "ziko"

// const ui=async (id)=>{
//     console.log({id})
//     const api = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
//     const res = await api.json()
//     return tags.h1(res.title)
// }

// const App = ({id}) =>{
//     return Suspense(
//         tags.h1("... waiting"), 
//         ()=>ui(id)
//     )
// }
// export default App

import {tags} from "ziko"
async function App({id}){
    const api = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    const res = await api.json()
    return tags.h1(res.title)

}
export default App
