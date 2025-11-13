'use client'
import {tags} from 'ziko/ui'
const { span } = tags
const Interactive = () => span('Interactive')
            .style({color : "red"})
            .onPtrDown(e=>e.target.style({color : Random.color()}))
            .useClient()

export default Interactive