import { Outlet, Link } from 'react-router-dom';

const CoachDashboard = () => {
  
    return (
        <div>
            <div>
               <Outlet />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <nav className="bg-gray-300 px-10 py-3 my-4 rounded-xl shadow-black shadow-lg">
                    <ul className="flex-cols text-lg font-medium">
                        <li className="mb-4 hover:text-indigo-500"><Link to="newuser">Add New Coach</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="coaches">View All Coaches</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="find">Update/Delete Players</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="upload">Upload Photo</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default CoachDashboard