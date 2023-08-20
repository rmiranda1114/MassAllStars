import FlexCard from "../../wraps/FlexCard";
import Button from "../../wraps/Button";

const PlayerCard = ({ player, handleClick }) => {

    return (
        <FlexCard>
            <p>Player's Name: {player.name}</p>
            <p>DOB: {player.dob} Age: {player.age}</p>
            <p>Team: {player.team} Number: {player.playerNumber}</p>
            <p>Sport: {player.sport} Uniform Size: {player.uniformSize}</p>
            <p>School: {player.school} Grade: {player.grade}</p>
            <p>Medical Condition: {player.medicalCondition}</p>
            <Button id={player._id} handleClick={handleClick}>View More</Button>
        </FlexCard>
    )
}

export default PlayerCard;