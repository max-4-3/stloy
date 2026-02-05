import axios from "axios";

const BACKEND = "http://localhost:5207"
const BACKEND_API = `${BACKEND}/api`

const api = axios.create({
    baseURL: BACKEND_API,
    timeout: 10000
})

export { api };

// api.interceptors.request.use(
//     (config) => {
//         const auth = getAuth();
//         if (auth && auth?.accessToken) {
//             config.headers.Authorization = `Bearer ${auth.accessToken}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const auth = getAuth();
//         if (!auth) return Promise.reject('Not Authenticated');

//         const originalRequest = error.config;

//         // If error is 401 and we haven't retried yet
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Call the refresh endpoint directly to avoid interceptor loops
//                 const { data } = await axios.post(`${BACKEND}/api/Auth/refresh`, { userId: auth?.userId, refreshToken: auth?.refreshToken }, { headers: { Authorization: "" } });
//                 setAuth({ ...data, ...auth });

//                 // Retry the original request with the new token
//                 originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;
//                 return api(originalRequest);
//             } catch (refreshError) {
//                 // If refresh fails, clear storage and boot to login
//                 localStorage.removeItem('auth');
//                 console.error(refreshError);
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );
