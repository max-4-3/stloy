import { useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "../auth/AuthContext";

export function LoginForm({ onSuccess }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const { status, data: { refreshToken, accessToken } } = await api.post("/Auth/login", {
                name,
                email,
                password
            });

            if (status !== 200) throw new Error("Login")
            else {
                const { status, data: { userId } } = await api.post('/Auth/config', { name, email, password });
                if (status === 200 && userId != null) {
                    login(userId, accessToken, refreshToken);
                    onSuccess();
                }
            };
        } catch (e) {
            console.error('Login error:', e);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                type="name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    );
}
