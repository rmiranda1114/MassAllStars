import React from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserProvider.js";

function NavMenu ({ handleLogout }) {
    const { user } = React.useContext(UserContext);
    return (
        <>
            <li><NavLink className="Link" to="/">Home</NavLink></li>
            <li><NavLink className="Link" to="/gallery">Gallery</NavLink></li>
            <li><NavLink className="Link" to="/register">Register</NavLink></li>
            <li><NavLink className="Link" to="/coach">Coach</NavLink></li>
            {!user.accesstoken ?<button><NavLink className="LinkButton" to="/login">Login</NavLink></button> : <button className="LinkButton" onClick={handleLogout}>Logout</button>}
        </>
    )
}

export default NavMenu;