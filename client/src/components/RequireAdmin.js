import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const RequireAdmin = () => {
    const { user } = useUser();
    const location = useLocation();

    return (
        user?.admin
            ? <Outlet />
            : <Navigate to='unauthorized' state={{ from: location }} replace />
    )
}

export default RequireAdmin;