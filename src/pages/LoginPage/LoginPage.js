import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function LoginPage({ setIsUserLoggedIn }) {

    const [error, setError] = useState();

    const handleOnSubmit = (event) => {
        // prevent default behaviour
        event.preventDefault();
    
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        // axios POST request: /login
        axios
          .post(
            `${API_BASE_URL}/login`,
            // body: username, password
            {
              email,
              password,
            }
          )
          .then((response) => {
            // get the token (JWT) from the response
            const { token } = response.data;
    
            // store it somewhere
            console.log(response);
            sessionStorage.setItem("token", token);
    
            setIsUserLoggedIn(true);
          })
          .catch((error) => {
            console.error("error!" + error);
            setError("Login failed :(");
          });
      };

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label>
                    Email
                    <input name="email" id="email"></input>
                </label>
                <label>
                    Password
                    <input name="password" id="password"></input>
                </label>

                {error && <div className="login__message">{error}</div>}

                <button>Login</button>
                <p>Don't have an account yet? Click below to signup!</p>
                <Link to='/signup'><button>Sign Up</button></Link>
            </form>
        </div>
    )
}