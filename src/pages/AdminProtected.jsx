import { Outlet } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { LoginForm } from '../components/LoginForm';

export default function Protected() {
    const { AccessToken } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            // Admin only endpoint!
            const { status } = await api.get('/students');
            setIsAdmin(status === 200);
        }

        checkAdmin();
    }, [AccessToken]);

    return isAdmin ? <Outlet /> : (
        <>
            <h1>Admin Login</h1>
            <LoginForm onSuccess={() => console.log("Admin Auth completed!")} />
        </>
    )
}
