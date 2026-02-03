export default function User({ data }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>Key</tr>
                    <tr>Value</tr>
                </thead>
                <tbody>
                    {
                        Object.entries(data).map(
                            ([k, v]) => (
                                <>
                                    <tr>{k}</tr>
                                    <tr>{v}</tr>
                                </>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
