import { useState } from "react";
import { api } from '../utils/api';

export default function Login({ onSuccess, onError }) {
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: ''
    });

    const [state, setState] = useState({
        requesting: false
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setState({
            requesting: true
        })
        api.post('/Auth/login', form).then((r) => {
            // Returns a `refreshToken and accessToken`
            // Find a way to persist that and use it for further requests
            // For now let the caller handle it
            api.post('/Auth/config', form).then(r1 => {
                onSuccess({...r.data, ...r1.data})
            });
        }).catch((err) => {
            onError(err);
        }).finally(() => {
            setState({ requesting: false });
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="iw">
                <label htmlFor="name"><sup>*</sup> Name</label>
                <input required disabled={state.requesting} id="name" type="text" name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="iw">
                <label htmlFor="email"><sup>*</sup> Email</label>
                <input required disabled={state.requesting} id="email" type="email" name="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="iw">
                <label htmlFor="password"><sup>*</sup> Password</label>
                <input required disabled={state.requesting} id="password" type="password" name="password" value={form.password} onChange={handleChange} />
            </div>

            <div className="iw">
                <button type="submit">Login</button>
            </div>
        </form>
    )
}
