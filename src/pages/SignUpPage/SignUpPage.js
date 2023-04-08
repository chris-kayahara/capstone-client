import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function SignUpPage() {

    const navigate = useNavigate();

    function handleSubmitSignUp(event) {
        event.preventDefault();
        const userInfo = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            password: event.target.password.value,
        }

        axios.post(`${API_BASE_URL}/user`, userInfo)
        .then(() => {
            navigate("/");
            event.target.reset();
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmitSignUp}>
                <label>
                    First Name
                    <input 
                        type="text"
                        name="firstName"
                        id="firstName"></input>
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"></input>
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        name="email"
                        id="email"></input>
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"></input>
                </label>
                <button type="submit">Sign Up</button>
                <Link to='/login'><button>Cancel</button></Link>
            </form>
        </div>
    )
}