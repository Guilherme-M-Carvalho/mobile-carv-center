import axios from "axios";
import { apiUrl } from "./apiUrl";

const api = axios.create({
    baseURL: `${apiUrl}/api`
})


export {api}