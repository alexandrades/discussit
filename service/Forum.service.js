import axios from 'axios'
import { parseCookies } from 'nookies'
import UsuarioService from './Usuario.service'

export const createAPIClient = (context) => {
    const { 'discussit-token': token } = parseCookies()

    const client = axios.create({
        baseURL: 'https://discussit-api.onrender.com'
    })

    client.interceptors.request.use(config => {
        return config;
    })

    if (token) {
        client.defaults.headers['authorization'] = `Bearer ${token}`
    }

    return client
}
const getForuns = async (context) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get('https://discussit-api.onrender.com/forum')
        return resultado.data
    } catch (error) {
    }
}

const deleteForum = async (context, idForum) => {
    try {
        const cliente = createAPIClient(context)

        const resultado = await cliente.delete(`https://discussit-api.onrender.com/forum/${idForum}`)
        return resultado.status
    } catch (error) {
        console.log(error)
    }
}

const createForum = async (forum) => {
    try {
        const resultado = await axios.post('https://discussit-api.onrender.com/forum', forum)
        return resultado.data
    } catch (error) {
        return error.response.data
    }
}

const getForumById = async (context) => {
    try {
        const idForum = context.params.idForum
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/forum/${idForum}`)
        return resultado.data
    } catch (error) {

    }
}

const getForumByIdUsuario = async (context, usuario) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/forum/${usuario.idUsuario}/all`)
        return resultado.data
    } catch (error) {

    }
}

const updateForum = async (forum) => {
    try {
        forum.updatedAt = new Date()
        const { 'discussit-token': token } = parseCookies()
        const resultado = await axios.put(`https://discussit-api.onrender.com/forum`, forum, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return resultado.data
    } catch (error) {
        return undefined
    }
}

const getForunsByUsuario = async (context) => {
    try {
        const cliente = createAPIClient(context)
        const usuario = context.params.usuario
        const resultado = await cliente.get(`https://discussit-api.onrender.com/${usuario}/forum`)
        return resultado.data
    } catch (error) {
        
    }
}

const getIncludingFollowed = async (context, idSeguidor) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/forum/${idSeguidor}/followers`)
        return resultado.data
    } catch (error) {

    }
}

const getRanking = async (context) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/forum/ranking`)
        return resultado.data
    } catch (error) {
        
    }
}

const followForum = async (context, idForum) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.post(`https://discussit-api.onrender.com/conexao-usuario-forum`, { idForum })
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const unfollowForum = async (context, idForum) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.delete(`https://discussit-api.onrender.com/conexao-usuario-forum/${idForum}`)
        return resultado.status
    } catch (error) {
        console.log(error)
    }
}

const isFollowing = async (context, idUsuario, idForum) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.post(`https://discussit-api.onrender.com/conexao-usuario-forum/${idUsuario}/${idForum}`)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const getFollowersCount = async (context, idForum) => {
    try {
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/conexao-usuario-forum/followers/${idForum}/count`)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}


export default {
    getForuns,
    deleteForum,
    createForum,
    getForumById,
    getForumByIdUsuario,
    updateForum,
    getForunsByUsuario,
    getIncludingFollowed,
    getRanking,
    followForum,
    unfollowForum,
    isFollowing,
    getFollowersCount
}