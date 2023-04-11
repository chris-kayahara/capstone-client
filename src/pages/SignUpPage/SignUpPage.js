import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './SignUpPage.scss'
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
        <div className="signup">
            <form className="signup__form" onSubmit={handleSubmitSignUp}>
                <h1>Register</h1>
                <p className="signup__text">Please fill out the form to register your account.</p>
                <label className="signup__label" htmlFor='firstName' >
                    First Name
                </label>
                    <input 
                        type="text"
                        name="firstName"
                        id="firstName"></input>
                <label className="signup__label" htmlFor='lastName'  >
                    Last Name
                </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"></input>
                <label className="signup__label" htmlFor='email'  >
                    Email
                </label>
                    <input
                        type="text"
                        name="email"
                        id="email"></input>
                <label className="signup__label"  htmlFor='password' >
                    Password
                </label>
                    <input
                        type="password"
                        name="password"
                        id="password"></input>
                <button  className="signup__button" type="submit">Sign Up</button>
                <Link to='/'><button  className="signup__cancel-button" >Cancel</button></Link>
            </form>
        </div>
    )
}