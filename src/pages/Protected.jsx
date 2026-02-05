import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export default function Protected() {
    const { AccessToken } = useAuth();
    return AccessToken ? <Outlet /> : <Navigate to="/" replace />
}
