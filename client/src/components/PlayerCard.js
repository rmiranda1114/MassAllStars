import { Link } from "react-router-dom"

function PlayerCard ({ x, handleClick }) {
    return (
        
            <div className="playerCard" >
                <p>Player's Name: <span>{x.player.name}</span></p>
                <p>DOB: <span>{x.player.dob}</span></p>
                <p>Sport: <span>{x.sport}</span> Uniform Size: <span>{x.uniformSize}</span></p>
                <p>Parent: <span>{x.player.parent}</span></p>
                <p>Phone Number: <span>{x.player.phone.main}</span></p>
                <button id={x._id} onClick={handleClick}>View More</button>
            


            </div>
        
    )
}

export default PlayerCard