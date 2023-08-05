import { useState, useContext } from "react";
import NavLinks from "./NavLinks.js";
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md"

function Navbar () {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [menuToggle, setMenuToggle] = useState(false);
  
  const handleLogout =  async () => {
    try{
      const res = await fetch('http://localhost:5000/api/logout',
        {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id
        }),
      })
        //Clear user from context
      sessionStorage.removeItem('JWT');
      setUser({});
      navigate('/');
      }catch (err) {
        console.log(err);
      }
    }

  const menuClick = () => {
    setMenuToggle(menuToggle ? false : true)
  }

    return (
      <>
        <div className="w-full h-24 bg-logoRed px-4 flex justify-between items-center">
          <div className="h-full" onClick={() => navigate("/")}>
            <img className=" max-h-full" src="../images/MASLogo.jpg"/>
          </div>
          <ul className="hidden sm:flex gap-4">
            <NavLinks user={user} handleLogout={handleLogout} />
          </ul>
          <div className="sm:hidden text-xl" onClick={() => menuClick()}>
            {!menuToggle ? <GiHamburgerMenu /> : <MdClose />}
          </div>
        </div>

        {menuToggle && 
          <div className="fixed sm:hidden right-0 bg-gray-300 opacity-90 w-52 text-center" onClick={()=>menuClick()}>
            <ul className='flex-col my-4'>
                <NavLinks user={user} handleLogout={handleLogout} />
            </ul>
          </div>}
      </>
      
        
    )
}

export default Navbar