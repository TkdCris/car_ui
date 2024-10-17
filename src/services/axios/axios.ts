import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

const setHeaderToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { api, setHeaderToken }
