import React from "react";
import NavLinks from "./NavLinks.js";
import MobileNavMenu from "./MobileNavMenu.js";
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserProvider";

function Navbar () {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserContext);
    const [menuToggle, setMenuToggle] = React.useState(false);
    const [hamburgerClass, setHamburgerClass] = React.useState('hamburgerMenu');
    const [menuClass, setMenuClass] = React.useState('mobileMenu hide');
  
  const handleLogout =  async () => {
    try{
      const res = await fetch('http://localhost:5000/api/logout',
        {  
        method: 'POST',
        credential: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh: sessionStorage.getItem('JWT')
        }),
      })
        //Clear user from context
      sessionStorage.removeItem('JWT');
      localStorage.removeItem('X-auth-token');
      setUser({});
      navigate('/');
      }catch (err) {
        console.log(err);
      }
    }

  const menuClick = (e) => {
    e.preventDefault();
    console.log('click');
    if (menuToggle) {
      setHamburgerClass('hamburgerMenu is-active');
      setMenuClass('mobileMenu visible');
    }else {
      setHamburgerClass('hamburgerMenu');
      setMenuClass('mobileMenu hide');
    }
    setMenuToggle(!menuToggle);
    
  }

    return (
      <div>
        <nav className="navbar">
            <header className="header">
                <img className="logo" src="../images/MASLogo.jpg" />
                <h1 className="pageTitle" >Mass All-Starz</h1>
            </header>
            <div className="navLinks"><NavLinks user={user} handleLogout={handleLogout} /></div>
            
            <button type="button" className={hamburgerClass} onClick={menuClick}><div className="bar" ></div></button>
        </nav>
        <div className="mobileSideMenu">
          <MobileNavMenu menuClass={menuClass} />
        </div>
        
      </div>
        
    )
}

export default Navbar