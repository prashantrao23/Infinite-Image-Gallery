import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.UNSPLASH_BASE_URL,
  headers: {
    Authorization: `Client-ID ${import.meta.env.UNSPLASH_ACCESS_KEY}`,
  },
});

export default api;
