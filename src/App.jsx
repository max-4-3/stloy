import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Admin from './pages/Admin'
import Employee from "./pages/Employee";
import Error from "./pages/404";
import Layout from "./pages/Layout";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Layout />}>
                <Route path="/emp" element={<Employee />} />
                <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    )
}
