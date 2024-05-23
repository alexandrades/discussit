import axios from 'axios'
import { parseCookies } from 'nookies'

export  const createAPIClient = (context) => {
    const {'discussit-token': token} = parseCookies(context)

    const client = axios.create({
        baseURL: 'https://discussit-api.onrender.com'
    })

    client.interceptors.request.use(config => {
    
        return config;
    })

    if(token){
        client.defaults.headers['authorization'] = `Bearer ${token}`
    }

    return client
}

const getUsuarioData = async (token) => {
    const {data} = await axios.post('https://discussit-api.onrender.com/sign/authenticate', null ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return data
}

const getUsuarioByUsuario = async (context) => {
    try {
        const cliente = createAPIClient(context)
        const usuario = context.params.usuario
        const resultado = await cliente.get(`https://discussit-api.onrender.com/${usuario}`)
        return resultado.data
    } catch (error) {
        
    }
}

const getUsuarios = async (context) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get('https://discussit-api.onrender.com/usuario')
        return resultado.data
    } catch (error) {
    }
}

const deleteUsuario = async (usuario) => {
    try {
        const {'discussit-token': token} = parseCookies()

        const {data} = await axios.delete(`https://discussit-api.onrender.com/${usuario}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return data
    } catch (error) {
        
    }
}

const createUsuario = async (usuario) => {
    try {
        const resultado = await axios.post('https://discussit-api.onrender.com/usuario', usuario)
        return resultado.data
    } catch (error) {
        
    }
}

const getUsuarioById = async (context, idUsuario) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/usuario/${idUsuario}`)
        return resultado.data
    } catch (error) {
        
    }
}

const updateUsuario = async (usuario) => {
    try {
        const {'discussit-token': token} = parseCookies()
        const resultado = await axios.put(`https://discussit-api.onrender.com/usuario`, usuario, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return resultado.data
    } catch (error) {
        
    }
}

const signIn = async (usuario, senha) => {
    try {
        const resultado = await axios.post(`https://discussit-api.onrender.com/sign`, {usuario, senha})
        return resultado.data
    } catch (error) {
        console.log(error.response.data)
    }
}

const followUsuario = async (context, idSeguido) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.post(`https://discussit-api.onrender.com/conexao/${idSeguido}`)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const unfollowUsuario = async (context, idSeguido) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.delete(`https://discussit-api.onrender.com/conexao/${idSeguido}`)
        return resultado.status
    } catch (error) {
        console.log(error)
    }
}

const isFollowing = async (context, idSeguidor, idSeguido) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.post(`https://discussit-api.onrender.com/conexao/${idSeguidor}/${idSeguido}`)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const getFollowersCount = async (context, idSeguido) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/conexao/followers/${idSeguido}/count`)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const getFollowingCount = async (context, idSeguidor) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/conexao/following/${idSeguidor}/count`)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

export default {
    createAPIClient,
    getUsuarioData,
    getUsuarios,
    deleteUsuario,
    createUsuario,
    getUsuarioById,
    getUsuarioByUsuario,
    updateUsuario,
    signIn,
    followUsuario,
    unfollowUsuario,
    isFollowing,
    getFollowersCount,
    getFollowingCount
}