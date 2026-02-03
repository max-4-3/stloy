import { useState } from "react"
import { isAdmin } from "../utils/api";
import { useNavigate } from "react-router";
import AdminPanel from "../components/AdminPanel";

export default function Admin() {
    const [state, setState] = useState({
        loading: false,
        admin: false,
    });
    const nav = useNavigate();

    const [value, setValue] = useState('');
    const handleSubmit = async (e) => {
        try {
            setState({ loading: true, admin: false });
            e.preventDefault();
            const admin = await isAdmin(value);
            if (admin === false) throw new Error("Not a adming");
            setValue(admin);
            setState({ loading: false, admin: true });
        } catch (e) {
            console.error(e);
            nav('/');
        }
    }

    return (
        <>
            <h1>Admin Dashboard</h1>
            {
                state.loading
                    ? "Checking..."
                    : (
                        state.admin == true
                            ? <AdminPanel key={value} />
                            : (
                                <form onSubmit={handleSubmit}>
                                    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
                                    <button>Submit!</button>
                                </form>
                            )
                    )
            }
        </>
    )
}
