import axios from "axios";

const axiosInstance = async () => {

    await axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        withCredentials: true
    })

}

export default axiosInstance