import axios from "axios";

const BACKEND_API = `http://localhost:5207/api`

const api = axios.create({
    baseURL: BACKEND_API,
    timeout: 10000
})

export { api };
