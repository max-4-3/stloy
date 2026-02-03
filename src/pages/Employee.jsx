import { useLocation } from "react-router"
import { postForm } from '../utils/api';
import { useEffect, useState } from "react";
import User from '../components/User';

export default function Employee() {
    const { state: formData } = useLocation();
    const [empInfo, setImpInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        is: false,
        todo: '',
    })

    useEffect(() => {
        console.log(formData);
        postForm(formData).then(res => {
            if (res.status == 200) {
                setImpInfo(res.data);
            } else {
                throw new Error(`Response isn't Ok: ${res.status}`)
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
