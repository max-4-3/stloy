export default function User({ data, onEdit, onDelete }) {
    return (
        <div className="user">
            <p>{data.empId}</p>
            <p>{data.name}</p>
            <p>{data.mobile}</p>
            <p>{data.email}</p>
            <p>{data.salery}</p>
            <p>{data.designation}</p>
            
            <div className="actions">
                {onEdit && (
                    <button className="icon-btn edit-btn" onClick={() => onEdit(data)}>
                        ✎
                    </button>
                )}
                {onDelete && (
                    <button className="icon-btn delete-btn" onClick={() => onDelete(data.empId)}>
                        🗑
                    </button>
                )}
            </div>
        </div>
    )
}
