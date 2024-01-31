import axios from "axios";

const API = axios.create({
   baseURL: import.meta.env.VITE_URL_API,
   headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
   },
});

export default API;
