export default function User({ data }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.entries(data).map(
                            ([k, v]) => (
                                <tr key={k}>
                                    <td>{k}</td>
                                    <td>{typeof v === "object" ? JSON.stringify(v) : String(v)}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
