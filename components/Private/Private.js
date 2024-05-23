import Router from "next/router";
import { parseCookies } from "nookies";

export function Private({children}) {
    const {"discussit-token": token} = parseCookies()
    if(token){
        return children
    }

    Router.push('/sign')
}

export default Private