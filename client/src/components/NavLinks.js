import React from "react";
import { NavLink } from "react-router-dom";

function NavMenu ({ user, handleLogout, style = "" }) {
    
    return (
        <>
            <div className={style}><NavLink to="/">Home</NavLink></div>
            <div className={style}><NavLink to="/gallery">Gallery</NavLink></div>
            <div className={style}><NavLink to="/register">Register</NavLink></div>
            <div className={style}><NavLink to={user.admin ? "/coach" : "/players"}>Coach</NavLink></div>
            {!user.accesstoken ? <div className={style}><NavLink to="/login">Login</NavLink></div> : <button className={style} onClick={handleLogout}>Logout</button>}
        </>
    )
}

export default NavMenu;