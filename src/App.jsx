import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { postForm } from './utils/api';
import User from './components/User';

export default function App() {
    const [completed, setCompleted] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [err, setError] = useState({
        is: false,
        internal: "",
        todo: ""
    });

    function foo(formData) {
        postForm(formData).then((d) => {
            setUserInfo(d.data);
        }).catch(err => {
            console.error(err);
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
            {
                (completed && !err.is)
                    ? (
                        <User data={userInfo} />
                    )
                    : ""
            }
        </>
    )
}
