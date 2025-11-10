import { tags } from "ziko/ui"
import { Random } from 'ziko'

// console.log(__Ziko__)
export const head = {
    title : 'Ziko Server Home Page',
}
export const prerender = false;
const {span} = tags
const App = () =>{
    // console.log({ziko})
    // if(req.locals) return tags.h1(req.locals.user)
    const ui = tags.p(
        span('Interactive')
            .style({color : "red"})
            .onPtrDown(e=>e.target.style({color : Random.color()}))
            .useClient()
            ,
        span('Not Interactive')
    )
    return ui
}


export default App