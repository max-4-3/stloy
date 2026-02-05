import { useState, useLayoutEffect } from "react";
import { api } from "../utils/api";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export default function AuthProvider({ children }) {
    const [userId, setUserId] = useState();
    const [AccessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();

    function login(userId, AccessToken, refreshToken) {
        console.log(`Loggin in: ${userId}, ${refreshToken}, ${AccessToken}`)
        setUserId(userId);
        setAccessToken(AccessToken);
        setRefreshToken(refreshToken);
    }

    function logout() {
        console.log(`Loggin out: ${userId}, ${refreshToken}, ${AccessToken}`)
        setUserId(undefined);
        setAccessToken(undefined);
        setRefreshToken(undefined);
    }

    // Request interceptors
    useLayoutEffect(() => {
        const requestInt = api.interceptors.request.use(
            (r) => {
                if (AccessToken)
                    r.headers.Authorization = `Bearer ${AccessToken}`;

                return r;
            },
            e => e
        )

        return () => api.interceptors.request.eject(requestInt);
    }, [AccessToken]);

    // Response interceptor
    useLayoutEffect(() => {
        const responstInt = api.interceptors.response.use(
            r => r,
            async e => {
                try {
                    if (!AccessToken) return Promise.reject(e);
                    const { response, config } = e;

                    if (response?.status === 401 && !config._retry) {
                        config._retry = true;

                        try {
                            const { data: { newRefreshToken, newAccessToken } } = await axios.post(`${api.defaults.baseURL}/Auth/refresh`, {
                                refreshToken, userId
                            });

                            setAccessToken(newAccessToken);
                            setRefreshToken(newRefreshToken);

                            config.headers.Authorization = `Bearer ${newAccessToken}`;
                            return api(config);
                        } catch (reErr) {
                            console.error('Refresh Error:', reErr);
                            throw reErr;
                        }
                    }

                } catch (e) {
                    console.error(e);
                }

                return Promise.reject(e);
            }
        );

        return () => api.interceptors.response.eject(responstInt);
    }, [AccessToken, refreshToken, userId]);

    return (
        <AuthContext.Provider value={{ AccessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
