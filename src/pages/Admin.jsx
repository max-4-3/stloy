import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import AdminPanel from "../components/AdminPanel";
import Login from '../components/Login';
import { getAuth, setAuth as updateAuth } from "../utils/auth";
import { api } from "../utils/api";

export default function Admin() {
    const [auth, manAuth] = useState(getAuth());
    const [admin, setAdmin] = useState(false);
    const [checking, setChecking] = useState(true);
    const redirect = useNavigate();

    async function onSuccess(d) {
        updateAuth(d);
        manAuth(getAuth());
    }

    useEffect(() => {
        async function adminCheck() {
            if (!auth) {
                setChecking(false);
                return;
            }

            try {
                const { status } = await api.get('/students');
                if (status === 200) {
                    setAdmin(true);
                } else {
                    updateAuth(undefined);
                    redirect('/');
                }
            } catch (err) {
                console.error("Admin verification failed", err);
                updateAuth(undefined);
                redirect('/');
            } finally {
                setChecking(false);
            }
        }

        adminCheck();
    }, [auth, redirect]);

    if (checking) return <div>Verifying Admin Status...</div>;
    return (
        <>
            {admin ? <AdminPanel /> : <Login onSuccess={onSuccess} onError={() => updateAuth(undefined) || redirect('/')} />}
        </>
    )
}
