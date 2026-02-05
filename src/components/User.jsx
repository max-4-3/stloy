export default function User({ data, onEdit }) {
    return (
        <div className="user">
            <p>{data.empId}</p>
            <p>{data.name}</p>
            <p>{data.mobile}</p>
            <p>{data.email}</p>
            <p>{data.salery}</p>
            <p>{data.designation}</p>
            {/* Add the edit button only if onEdit is provided (Admin mode) */}
            {onEdit && (
                <button className="edit-btn" onClick={() => onEdit(data)}>
                    ✎
                </button>
            )}
        </div>
    )
}
