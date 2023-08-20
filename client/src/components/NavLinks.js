import React from "react";
import { NavLink } from "react-router-dom";

function NavMenu ({ user, handleLogout, style = "" }) {
    
    return (
        <>
            <div className={style}><NavLink to="/">Home</NavLink></div>
            <div className={style}><NavLink to="/gallery">Gallery</NavLink></div>
            <div className={style}><NavLink to="/register">Register</NavLink></div>
            <div className={style}><NavLink to={user.admin ? "/coaches" : "/players"}>Coach</NavLink></div>
            {!user.accesstoken ? <div className={style}><NavLink to="/login">Login</NavLink></div> : <div className={style} onClick={handleLogout}>Logout</div>}
        </>
    )
}

export default NavMenu;