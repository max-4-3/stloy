import { useNavigate } from "react-router";
import { LoginForm } from "../components/LoginForm";

export default function Login() {
    const redirect = useNavigate();
    return (
        <>
            <h1>Hello, Login</h1>
            <LoginForm onSuccess={() => redirect('/home')} />
        </>
    )
}
