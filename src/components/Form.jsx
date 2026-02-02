import { useState } from "react";
import './Form.css';

function InputElem({ label, name, value, onChange, required = true, type = "text" }) {
    return (
        <>
            <label htmlFor={name}>{required && "*"} {label || "Unknown"}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </>
    );
}

function Form({ handleSubmit }) {

    const [formData, setFormData] = useState({
        empId: "",
        name: "",
        mobile: "",
        email: "",
        designation: "peon"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "empId" ? parseInt(value) || "" : value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <form id="empForm" onSubmit={onSubmit}>
            <InputElem name="empId" label="Employee ID" type="number" value={formData.empId} onChange={handleChange} />
            <InputElem name="name" label="Name" value={formData.name} onChange={handleChange} />
            <InputElem name="mobile" label="Mobile" type="tel" value={formData.mobile} onChange={handleChange} />
            <InputElem name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />

            <label htmlFor="designation">*Designation</label>
            <select
                value={formData.designation}
                required={true}
                name="designation"
                id="designation"
                onChange={handleChange}
            >
                <option value="manager">Manager</option>
                <option value="clerk">Clerk</option>
                <option value="peon">Peon</option>
            </select>
            <button type="submit">Button!</button>
        </form>
    );
}

export default Form;
