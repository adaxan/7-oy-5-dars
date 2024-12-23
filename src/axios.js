import axios from "axios";

export const http = axios.create({
    baseURL: "https://auth-rg69.onrender.com/api/"
})