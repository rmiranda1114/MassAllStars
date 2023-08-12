const PlayerInfo = ({ player }) => {
    return (
        <>
            <div className="flex justify-between mb-4 text-xl">
                <h3>Player</h3>
            </div>
            <div className="flex my-1">
                <div className="basis-1/3">Player's Name: </div>
                <div className="basis-2/3 bg-white rounded-md px-2">{player.name}</div>
            </div>
            <div className="flex my-1 gap-1">
                <div className="basis-1/6">DOB: </div>
                <div className="basis-1/3 bg-white rounded-md px-2">{player.dob}</div>
                <div  className="basis-1/3">Age: </div>
                <div  className="basis-1/6 bg-white rounded-md px-2">{player.age}</div>
            </div>
            <div className="flex my-1 gap-1">
                <div className="basis-1/6">School: </div>
                <div className="basis-1/3 bg-white rounded-md px-2">{player.school}</div>
                <div className="basis-1/3">Grade: </div>
                <div className="basis-1/6 bg-white rounded-md px-2">{player.grade}</div>
            </div>
            <div className="flex my-1 gap-1">
                <div className="basis-1/6">Sport: </div>
                <div className="basis-1/3 bg-white rounded-md px-2">{player.sport}</div>
                <div className="basis-1/3">Uniform Size: </div>
                <div className="basis-1/6 bg-white rounded-md px-2">{player.uniformSize}</div>
            </div>
            <div className="flex my-1 gap-1">
                <div className="basis-1/6">Team: </div>
                <div className="basis-1/3 bg-white rounded-md px-2">{player.team}</div>
                <div className="basis-1/3">Number: </div>
                <div className="basis-1/6 bg-white rounded-md px-2">{player.playerNumber}</div>
            </div>
            <div className="flex my-1 gap-1">
                <div className="basis-1/3">Pref. Numbers: </div>
                <div className="basis-1/6 bg-white rounded-md px-2">{player.prefNum.num1}</div>
                <div className="basis-1/6 bg-white rounded-md px-2">{player.prefNum.num2}</div>
                <div className="basis-1/6 bg-white rounded-md px-2">{player.prefNum.num3}</div>
            </div>
            <div className="flex my-1 gap-1">
                <div className="basis-1/3">Medical Condition: </div><div className="basis-2/3 bg-white rounded-md px-2">{player.medicalCondition}</div>
            </div>
        </>
    )

}

export default PlayerInfo;