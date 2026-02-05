import { Outlet, useNavigate } from "react-router"

export default function Layout() {
    const nav = useNavigate();

    return (
        <>
            <button onClick={() => nav(-1)}>Go Back</button>
            <div className="outlet">
                <Outlet />
            </div>
        </>
    )
}
