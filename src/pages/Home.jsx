import { useEffect, useState } from 'react';
import Form from '../components/Form';
import { useNavigate } from 'react-router';
import { api } from '../utils/api';

// ATP: Logged in (either admin or normie)
export default function Home() {
    const redirect = useNavigate();
    const [form, setForm] = useState();
    const [emp, setEmp] = useState();
    const [not, setNot] = useState('');

    useEffect(() => {
        if (form == null) return;
        api.post('/student', form).then(({ status, data }) => {
            if (status === 200) {
                setEmp(data);
            } else if (status == 400) {
                setNot('UserId is Already taken');
            } else {
                throw new Error("Unable to add");
            }
        }).catch((err) => {
            if (err) {
                console.log('Err:', err);
                setNot('Unable to add employee')
            }
        });
    }, [form, emp]);

    return (
        <>
            <p className='title'>Add Employee</p>
            <Form onSubmit={setForm} />
            {emp != null && redirect('/emp', { state: emp })}
            { typeof not === 'string' && not }
        </>
    )
}
