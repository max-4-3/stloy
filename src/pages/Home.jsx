import './Home.css';
import Form from '../components/Form';
import { useNavigate } from 'react-router';

export default function Home() {
    const navigator = useNavigate();

    function foo(formData) {
        navigator('/emp', { state: formData })
    }

    return (
        <>
            <h1>Enter Details</h1>
            <Form handleSubmit={foo} />
        </>
    )
}
