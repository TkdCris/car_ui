import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

const setHeaderToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export { api, setHeaderToken }
