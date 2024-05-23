import axios from 'axios'
import { parseCookies } from 'nookies'

export  const createAPIClient = (context) => {
    const {'discussit-token': token} = parseCookies()

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
const get = async (context) => {
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

const getForumByIdUsuario = async (context) => {
    try {
        const usuario = context.query.usuario
        const cliente = createAPIClient(context)
        const resultado = await cliente.get(`https://discussit-api.onrender.com/forum/${usuario}/all`)
        return resultado.data
    } catch (error) {
        
    }
}

const updateForum = async (forum) => {
    try {
        forum.updatedAt = new Date()
        const {'discussit-token': token} = parseCookies()
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

const createComentario = async (comentario) => {
    try {
        const resultado = await axios.post('https://discussit-api.onrender.com/comentario', comentario)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const updateComentario = async (comentario) => {
    try {
        const resultado = await axios.put('https://discussit-api.onrender.com/comentario', comentario)
        return resultado.data
    } catch (error) {
        console.log(error)
    }
}

const deleteComentario = async (context, idComentario) => {
    try {
        const cliente = createAPIClient(context)

        const resultado = await cliente.delete(`https://discussit-api.onrender.com/comentario/${idComentario}`)
        return resultado.status
    } catch (error) {
        console.log(error)
    }
}


export default {
    createComentario,
    updateComentario,
    deleteComentario
}