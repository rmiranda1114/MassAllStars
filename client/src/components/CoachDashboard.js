import { useContext, useEffect }from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserProvider.js";


function CoachDashboard () {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    

    useEffect(() => {
        if (!user.accesstoken) return navigate('../login');
    },[])
    
    return (
        <div>
            <div>
               <Outlet />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <nav className="bg-gray-300 px-10 py-3 mb-4 rounded-xl shadow-black shadow-lg">
                    <ul className="flex-cols text-lg font-medium">
                        <li className="mb-4 hover:text-indigo-500"><Link to="newuser">Add New Coach</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="coaches">View All Coaches</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="players">View All Players</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="find">Update/Delete Players</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="upload">Upload Photo</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
        
    )
}

export default CoachDashboard