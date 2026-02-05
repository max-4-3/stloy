import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Admin from './pages/Admin'
import Employee from "./pages/Employee";
import Error from "./pages/404";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Protected from "./pages/Protected";
import AdminProtected from "./pages/AdminProtected";
import AuthProvider from "./auth/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route element={<Protected />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/emp" element={<Employee />} />
                    </Route>
                    <Route element={<AdminProtected />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </AuthProvider>
    )
}
