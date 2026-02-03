import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5207/api",
    timeout: 10000
})

export { api };

export function postForm(formData) {
    //TODO: Parse http errors (duplication, ect)
    return api.post('/student', formData);
}

export async function isAdmin(pass) {
    try {
        const res = await api.post('/admin', { pass: pass });
        if (res.status != 200)
            throw new Error(`Not gud: ${res.status}`);
        return res.data.authKey;
    } catch (e) {
        console.error(e);
        return false;
    }
}
