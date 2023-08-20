import { Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const WelcomeCoach = () => {
    const { user } = useUser();

    return (
        <>
            <h1 className="my-8 text-center text-2xl font-bolds">Coach {user.user}</h1>
            <Outlet />
        </>
    )
}
export default WelcomeCoach;