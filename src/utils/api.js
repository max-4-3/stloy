import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5207/api",
    timeout: 10000
})

export { api };

export function postForm(formData) {
    return api.post('/student', formData);
}
