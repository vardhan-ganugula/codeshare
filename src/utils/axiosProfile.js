import axios from "axios";


const axiosProfile = axios.create({
    baseURL : import.meta.env.VITE_BACKEND,
    headers: {
        'Content-Type' : 'application/json'
    }
})

export default axiosProfile;