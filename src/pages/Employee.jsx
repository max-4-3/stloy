import { useNavigate, useLocation } from "react-router"
import { api } from '../utils/api';
import { useEffect, useState } from "react";
import User from '../components/User';
import { getAuth } from "../utils/auth";

export default function Employee() {
    const redirect = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        if (!auth) redirect('/');
    })

    const { state: formData } = useLocation();
    const [empInfo, setImpInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        is: false,
        todo: '',
    });

    useEffect(() => {
        console.log(formData);
        api.post('/student', formData).then(({ data, status, statusText }) => {
            if (status === 200) {
                setImpInfo(data);
            } else {
                throw new Error(`onse isn't Ok: ${statusText} [${status}]`)
            }
        }).catch((err) => {
            setError({
                is: true,
                todo: `Error: ${err}`
            })
        }).finally(() => setLoading(false))
    }, [formData]);

    return (
        <>
            <h1>Employee</h1>
            {loading
                ? "Loading..."
                : (
                    error.is
                        ? (<p>Something bad happened:<br />{error.todo}</p>)
                        : (<User data={empInfo} />)
                )
            }
        </>
    )
}
