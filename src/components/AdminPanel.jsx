import { useEffect, useState } from 'react';
import './AdminPanel.css';
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
        <div className='dash'>
            <div className="row">
                <p>EMPID</p>
                <p>NAME</p>
                <p>MOBILE</p>
                <p>EMAIL</p>
                <p>SALERY</p>
                <p>DESIGNATION</p>
            </div>
            { emps && emps.map((v, i) => (<User key={i} data={v} />)) } 
        </div>
    )
}
