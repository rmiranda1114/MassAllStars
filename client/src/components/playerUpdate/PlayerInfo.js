const PlayerInfo = ({ player }) => {
    return (
        <>
            <div className="flex justify-evenly mb-4 text-xl">
                <h3>Player</h3>
            </div>
            <div className="flex-col">
                <div className="flex my-1 justify-between">
                    <div className="">Player's Name: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.name}</div>
                </div>
                <div className="flex my-1 justify-between gap-1">
                    <div className="">DOB: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.dob}</div>
                    </div>
                <div className="flex my-1 justify-between gap-1">
                    <div  className="">Age: </div>
                    <div  className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.age}</div>
                </div>
                <div className="flex my-1 justify-between gap-1">
                    <div className="">School: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.school}</div>
                    </div>
                <div className="flex my-1 justify-between gap-1">
                    <div className="">Grade: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.grade}</div>
                </div>
                <div className="flex my-1 justify-between gap-1">
                    <div className="">Sport: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.sport}</div>
                    </div>
                <div className="flex my-1 justify-between gap-1">
                    <div>Uniform Size: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.uniformSize}</div>
                </div>
                <div className="flex my-1 justify-between gap-1">
                    <div className="">Pref. Numbers: </div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.prefNum.num1}</div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.prefNum.num2}</div>
                    <div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.prefNum.num3}</div>
                </div>
                <div className="flex my-1 justify-between gap-1">
                    <div className="">Medical Condition: </div><div className="bg-white rounded-md px-2 ml-1 flex-grow text-center">{player.medicalCondition}</div>
                </div>
            </div>
        </>
    )
}

export default PlayerInfo;