import axios from "axios";


const axiosProfile = axios.create({
    url : import.meta.env.VITE_BACKEND,
    headers: {
        'Content-Type' : 'application/json'
    }
})

export default axiosProfile;