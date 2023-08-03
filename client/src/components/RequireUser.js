import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const RequireUser = () => {
    const { user } = useUser();
    const location = useLocation();

    return (
        user?.user
            ? <Outlet />
            : <Navigate to='login' state={{ from: location }} replace /> 
    )
}

export default RequireUser;