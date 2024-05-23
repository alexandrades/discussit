import axios from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import UsuarioService from "../service/Usuario.service";

export const AuthContext = createContext({})

export function AuthProvider({children}){
    const [usuario, setUsuario] = useState(null)
    const isAutenticado = !!usuario

    useEffect(() => {
        const {'discussit-token' :token} = parseCookies()
        let data = null

        if(!usuario && token){
            const data = getUsuarioData(token)
            setUsuario(data)
        }

    }, [usuario])


    async function getUsuarioData(token) {
        const {data} = await axios.post('https://discussit-api.onrender.com/sign/authenticate', null ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        setUsuario(data)
    }

    async function signIn({username, senha}) {
        try {
            const response = await axios.post('https://discussit-api.onrender.com/sign', {usuario: username, senha})
            const {token, usuarioData} = response.data

            setCookie(undefined, 'discussit-token', token, {
                maxAge: 600
            })

            setUsuario(usuarioData)

            console.log("MUDA", usuarioData)
            Router.push(`/${usuarioData.usuario}`)
            console.log("MUDA")
        } catch (error) {
            return error.response
        }
    }

    async function logOut() {
        destroyCookie({}, 'discussit-token')

        setUsuario(null)

        Router.push(`/`)
    }

    return(
        <AuthContext.Provider value={{
            isAutenticado,
            signIn,
            logOut,
            usuario,
            setUsuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}