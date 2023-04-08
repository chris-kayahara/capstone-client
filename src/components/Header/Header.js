import { Link, NavLink, useNavigate } from "react-router-dom";

import './Header.scss'

export default function Header({ setIsUserLoggedIn }) {

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
                <div onClick={logOut}>
                    Log Out
                </div>
            </div>
        </header>
    )
}