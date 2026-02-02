import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { doSomething } from './functions/Api';

export default function App() {
    const [completed, setCompleted] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [err, setError] = useState({
        is: false,
        internal: "",
        todo: ""
    })

    function foo(formData) {
        doSomething(formData).then(() => {
            setUserInfo(formData);
        }).catch(err => {
            setError({
                is: true, internal: err, todo: "Refresh"
            })
        }).finally(() => setCompleted(true))
    }

    return (
        <>
            {
                completed
                    ? (err.is ? `Error: ${err.todo}` : (userInfo ? `Welcome ${userInfo.name}!` : "Welcome Abroad!"))
                    : ("Login with your creds:")
            }
            {
                !completed && <Form handleSubmit={foo} />
            }
        </>
    )
}
