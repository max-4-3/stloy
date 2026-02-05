import './User.css';
export default function User({ data }) {
    return (
        <div className="user">
            <p>{data.empId}</p>
            <p>{data.name}</p>
            <p>{data.mobile}</p>
            <p>{data.email}</p>
            <p>{data.salery}</p>
            <p>{data.designation}</p>
        </div>
    )
}
