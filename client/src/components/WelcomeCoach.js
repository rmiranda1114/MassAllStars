import useAuth from "../hooks/useUser";

function WelcomeCoach () {
    const { user } = useAuth();

    return (
        <div className="my-8 text-center text-2xl font-bolds">
            <h1>Coach {user.user}</h1>
        </div>
    )
}
export default WelcomeCoach;