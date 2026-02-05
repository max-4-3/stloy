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

    // Update logic
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

    // Delete logic
    const handleDelete = async (empId) => {
        if (window.confirm(`Permanently delete Employee #${empId}?`)) {
            try {
                const { status } = await api.delete(`/student/${empId}`);
                if (status === 200 || status === 204) {
                    // Update local state immediately for a fast UI feel
                    setEmps(prev => prev.filter(e => e.empId !== empId));
                }
            } catch (err) {
                console.error("Delete error:", err);
                alert("Could not delete employee.");
            }
        }
    };

    return (
        <div className='dash'>
            {editingEmp ? (
                <div className="edit-container">
                    <h1>Updating Employee: {editingEmp.empId}</h1>
                    <h2>Employee Id can't be updated</h2>
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
                        <p>ACTION</p> {/* New Column for the Pen & Trash Icon */}
                    </div>
                    {emps && emps.map((v, i) => (
                        <User key={i} data={v} onEdit={setEditingEmp} onDelete={handleDelete} />
                    ))}
                </>
            )}
        </div>
    )
}
