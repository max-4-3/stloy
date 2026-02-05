import { useEffect, useState } from 'react';
import User from './User';
import Form from './Form';
import { api } from '../utils/api';

export default function AdminPanel() {
    const [emps, setEmps] = useState([]);
    const [editingEmp, setEditingEmp] = useState(null);

    const fetchEmps = () => {
        api.get('/students').then(r => {
            setEmps([...r.data]);
        });
    };

    useEffect(() => {
        fetchEmps();
    }, []); // Empty dependency array to run only once [cite: 8]

    const handleUpdate = async (updatedData) => {
        try {
            // Your backend endpoint: /student/{EmpId}
            const { status } = await api.put(`/student/${updatedData.empId}`, updatedData);
            if (status === 200) {
                setEditingEmp(null); // Close the form
                fetchEmps(); // Refresh the list
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Unable to update employee");
        }
    };

    return (
        <div className='dash'>
            {editingEmp ? (
                <div className="edit-container">
                    <h3>Updating Employee: {editingEmp.empId}</h3>
                    <Form initialData={editingEmp} onSubmit={handleUpdate} />
                    <button onClick={() => setEditingEmp(null)}>Cancel</button>
                </div>
            ) : (
                <>
                    <div className="row">
                        <p>EMPID</p>
                        <p>NAME</p>
                        <p>MOBILE</p>
                        <p>EMAIL</p>
                        <p>SALERY</p>
                        <p>DESIGNATION</p>
                        <p>ACTION</p> {/* New Column for the Pen Icon */}
                    </div>
                    { emps && emps.map((v, i) => (
                        <User key={i} data={v} onEdit={setEditingEmp} />
                    )) }
                </>
            )}
        </div>
    )
}
