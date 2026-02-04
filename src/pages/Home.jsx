import { useState } from 'react';
import Login from '../components/Login';
import Form from '../components/Form';
import './Home.css';
import { getAuth, setAuth as updateAuth } from '../utils/auth';
import { useNavigate } from 'react-router';

export default function Home() {
    const [auth, manAuth] = useState(getAuth());
    const redirect = useNavigate();

    async function onSuccess(d) {
        updateAuth(d);
        manAuth(getAuth());
    }

    return (
        <>
            {
                !auth
                    ? <Login onSuccess={onSuccess} onError={console.error} />
                    : <Form onSubmit={(d) => {redirect('/emp', { state: d })}} />
            }
        </>
    )
}
