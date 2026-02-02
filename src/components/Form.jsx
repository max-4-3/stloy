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
        designation: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <form id="empForm" onSubmit={onSubmit}>
            <InputElem required={false} name="empId" label="Employee ID" type="number" value={formData.empId} onChange={handleChange} />
            <InputElem required={false} name="name" label="Name" value={formData.name} onChange={handleChange} />
            <InputElem required={false} name="mobile" label="Mobile" type="tel" value={formData.mobile} onChange={handleChange} />
            <InputElem required={false} name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
            <InputElem name="designation" label="Designation" value={formData.designation} onChange={handleChange} />
            <button type="submit">Button!</button>
        </form>
    );
}

export default Form;
