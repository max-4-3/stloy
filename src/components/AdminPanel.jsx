import { useEffect, useState } from 'react';
import User from '../components/User';
import { api } from '../utils/api';

export default function AdminPanel() {
    const [emps, setEmps] = useState([]);
    useEffect(() => {
        api.get('/students').then(r => {
            setEmps(() => [...r.data]);
        })
    });

    return (
        <>
            <h1>Admin panel</h1>
            <div>
                { emps && emps.map((v, i) => (<User key={i} data={v} />)) } 
            </div>
        </>
    )
}
