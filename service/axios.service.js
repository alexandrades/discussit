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
        client.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return client
}