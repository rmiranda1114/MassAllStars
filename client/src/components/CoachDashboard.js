import { Outlet, Link } from 'react-router-dom';

const CoachDashboard = () => {
  
    return (
        <div>
            <div>
               <Outlet />
            </div>
            <div className="mx-auto w-full max-w-xs text-center">
                <nav className="bg-gray-300 px-10 py-3 my-4 rounded-xl shadow-black shadow-lg">
                    <ul className="flex-cols text-lg font-medium">
                        <li className="mb-4 hover:text-indigo-500"><Link to="coaches">Manage Coaches</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="find">Manage Players</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="teams">Manage Teams</Link></li>
                        <li className="mb-4 hover:text-indigo-500"><Link to="upload">Manage Photos</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default CoachDashboard