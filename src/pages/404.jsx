import { useEffect } from "react";
import { useNavigate } from "react-router"

export default function Error() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate(-1);
        }, 2000)
    })

    return (
        <>
            <h1>Doesn't Exist!</h1>
        </>
    )
}
