import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.115.186:3333/api"
})

export {api}