import { Link, NavLink } from "react-router-dom";

import './Header.scss'

export default function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <Link className="header__logo" to="/">PicPinner</Link>
                <div className="header__nav-list">
                    <NavLink
                        to="/support"
                        className={({ isActive }) =>
                        isActive ? "header__nav-link--active" : "header__nav-link"}>
                        Support</NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                        isActive ? "header__nav-link--active" : "header__nav-link"}>
                        Contact</NavLink>
                </div>
            </div>
        </header>
    )
}