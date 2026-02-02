export default function User({ data }) {
    return (
        <div>
            {
                Object.values(data).map((v, i) => <p key={i}>{Object.keys(data)[i]}: {v}</p>)
            }
        </div>
    )
}
