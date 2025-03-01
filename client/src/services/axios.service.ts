import axios from 'axios'
import { router } from '~/page/router'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})

instance.interceptors.response.use((res) => res, (err) => {
    if (err.status === 401) {
        router.navigate('/login', { replace: true })
        return null
    }
    return err
})

export default instance