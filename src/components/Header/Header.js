import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import './Header.scss'

export default function Header({ isUserLoggedIn, setIsUserLoggedIn }) {

    const navigate = useNavigate();

    const logOut = () => {
        if (!sessionStorage.getItem("token")){
            return
        }
        sessionStorage.removeItem("token");
        setIsUserLoggedIn(false);
        navigate("/");
    };

        return (
            <header className="header">
            <div className="header__content">
                <Link className="header__logo" to="/">Photo Mapper</Link>
                { isUserLoggedIn === true ? 
                                <div className="header__logout" onClick={logOut}>
                                Sign Out
                            </div> : <></>}

            </div>
        </header>
        )
}