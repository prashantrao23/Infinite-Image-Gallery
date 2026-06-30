import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_UNSPLASH_BASE_URL,
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
    },
});

export default api;