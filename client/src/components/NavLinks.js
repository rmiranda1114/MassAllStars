import React from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserProvider.js";

function NavMenu ({ handleLogout, style }) {
    const { user } = React.useContext(UserContext);
    return (
        <>
            <li className={style}><NavLink to="/">Home</NavLink></li>
            <li className={style}><NavLink to="/gallery">Gallery</NavLink></li>
            <li className={style}><NavLink to="/register">Register</NavLink></li>
            <li className={style}><NavLink to="/coach">Coach</NavLink></li>
            {!user.accesstoken ?<button><NavLink className="LinkButton" to="/login">Login</NavLink></button> : <button className="LinkButton" onClick={handleLogout}>Logout</button>}
        </>
    )
}

export default NavMenu;