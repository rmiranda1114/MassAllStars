import useAuth from "../hooks/useUser";

function WelcomeCoach () {
    const { user } = useAuth();

    return (
        <div className="mainContent coachContent">
            <h1>Welcome {user.user}</h1>
        </div>
    )
}
export default WelcomeCoach;