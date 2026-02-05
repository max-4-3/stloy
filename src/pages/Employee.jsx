import { useLocation } from "react-router"
import User from '../components/User';

export default function Employee() {
    const { state: empInfo } = useLocation();
    return (
        <>
            <h1>Employee</h1>
            <div className="wrap">
                <div className="row">
                    <p>EMPID</p>
                    <p>NAME</p>
                    <p>MOBILE</p>
                    <p>EMAIL</p>
                    <p>SALERY</p>
                    <p>DESIGNATION</p>
                </div>
                <User data={empInfo} />
            </div>
        </>
    )
}
