
const PlayerCard = ({ player, handleClick }) => {

    return (
        <div className=" w-5/6 max-w-xs bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base" >
            <p>Player's Name: {player.name}</p>
            <p>DOB: {player.dob} Age: {player.age}</p>
            <p>Team: {player.team} Number: {player.playerNumber}</p>
            <p>Sport: {player.sport} Uniform Size: {player.uniformSize}</p>
            <p>School: {player.school} Grade: {player.grade}</p>
            <p>Medical Condition: {player.medicalCondition}</p>
            <button className="w-full p-2 bg-gray-400 rounded-lg" id={player._id} onClick={handleClick}>View More</button>
        </div>
    )
}

export default PlayerCard;