import axios from "axios";

export const http = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API,
})