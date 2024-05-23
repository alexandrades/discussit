import { parseCookies } from "nookies"
import { useContext, useEffect } from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import SignIn from "../components/SignIn/SignIn"
import { AuthContext } from "../contexts/AuthContext.context"

export default function SignInPage() {
    const {setUsuario} = useContext(AuthContext)

    useEffect(() => {
        const { 'discussit-token': token } = parseCookies()
        if(!token) {
            setUsuario(null)
        }
    }, [])

    return (
        <>
            <Header hide={{ entrar: true }} />

            <SignIn />

            <Footer />
        </>

    )
}