import React from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserProvider.js";


function CoachDashboard () {
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);
    

    React.useEffect(() => {
        if (!user.accesstoken) return navigate('../login');
    },[])
    
    return (
        <div className="coachMain">
            <nav className="coachNav">
                <ul className="links">
                    <li><Link className="Link2" to="newuser">Add New Coach</Link></li>
                    <li><Link className="Link2" to="coaches">View All Coaches</Link></li>
                    <li><Link className="Link2" to="players">View All Players</Link></li>
                    <li><Link className="Link2" to="find">Update/Delete Players</Link></li>
                    <li><Link className="Link2" to="upload">Upload Photo</Link></li>
                </ul>
        
            </nav>
                
            <div className="mainContent coachContent">
               <Outlet />
            </div>
            
        
        </div>
        
    )
}

export default CoachDashboard