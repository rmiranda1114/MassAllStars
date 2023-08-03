
function PlayerCard ({ x, handleClick }) {
    return (
        <div className=" w-5/6 max-w-xs bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base" >
            <p>Player's Name: <span>{x.player.name}</span></p>
            <p>DOB: <span>{x.player.dob}</span></p>
            <p>Sport: <span>{x.sport}</span> Uniform Size: <span>{x.uniformSize}</span></p>
            <p>Parent: <span>{x.player.parent}</span></p>
            <p>Phone Number: <span>{x.player.phone.main}</span></p>
            <button className="w-full p-2 bg-gray-400 rounded-lg" id={x._id} onClick={handleClick}>View More</button>
        </div>
    )
}

export default PlayerCard