import { useState } from "react";
import NavLinks from "./NavLinks.js";
import { useNavigate, Outlet } from 'react-router-dom';
import useUser from '../hooks/useUser.js'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md"

function Navbar () {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
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
      <main>
        <div className="w-full h-24 bg-logoRed px-4 flex justify-between items-center">
          <div className="h-full" onClick={() => { setMenuToggle(false); navigate("/"); }}>
            <img className=" max-h-full" src="../images/MASLogo.jpg"/>
          </div>
          <nav className="hidden sm:flex text-lg gap-6 font-semibold">
            <NavLinks user={user} handleLogout={handleLogout} style={"hover:text-white"} />
          </nav>
          <div className="sm:hidden text-xl" onClick={() => menuClick()}>
            {!menuToggle ? <GiHamburgerMenu /> : <MdClose />}
          </div>
        </div>
        <div onClick={() => setMenuToggle(false)}>
          <Outlet/>
        </div>
        

        {menuToggle && 
          <div className="absolute sm:hidden top-24 right-0 h-fit pb-8 bg-gray-300 opacity-90 w-52 text-center" onClick={()=>menuClick()}>
            <nav className="h-full flex-col content-evenly">
              <NavLinks user={user} handleLogout={handleLogout} style={"my-8 hover:text-indigo-500"}/>
            </nav>
          </div>}
      </main>
      
        
    )
}

export default Navbar