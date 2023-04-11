import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import './LoginPage.scss'
import heroImage from '../../assets/images/hero-image.svg'

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
            sessionStorage.setItem("token", token);
    
            setIsUserLoggedIn(true);
          })
          .catch((error) => {
            console.error("error!" + error);
            setError("Login failed. Please try again.");
          });
      };

    return (
        <div className="login">
            <div className="login__content">
              <div className="login__hero-container">
                <h1 className="login__hero-header">Welcome to Photo Mapper!</h1>
                <p className="login__hero-text">The app the lets you compile your photos and plot their location on an interactive map to share with your friends and family.</p>
                <img className="login__hero-image" alt="hero" src={heroImage}/>
              </div>
              <form className="login__form" onSubmit={handleOnSubmit}>
                    <label className="login__label" htmlFor='email'>
                        Email
                    </label>
                        <input name="email" id="email"></input>
                    <label className="login__label" htmlFor='password'>
                        Password
                    </label>
                        <input type="password" name="password" id="password"></input>
                    {error && <div className="login__message">{error}</div>}
                  <button className="login__button">Sign In</button>
                  <p className="login__signup-text">Don't have an account yet? Click <span>
                  <Link className="login__signup-link" to='/signup'>HERE</Link>
                    </span> to register!</p>
              
              </form>
            </div>
        </div>
    )
}