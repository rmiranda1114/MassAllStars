const PlayerDetailsCard = ({ player }) => {
    
        return (
            <>
                <h5 className="text-center underline font-bold mb-2">Player Information</h5>
                <h6>Player's Name: {player.name}</h6>
                <h6>DOB: {player.dob} Age: {player.age}</h6>
                <h6>Sport: {player.sport} Uniform Size: {player.uniformSize}</h6>
                <h6>Parent: {player.parent.name}</h6> 
                <h6>Phone Number: {player.parent.phoneMain}</h6>
                <h6>Address: {player.parent.address.street}</h6>
                <h6>City: {player.parent.address.city}</h6>  
                <h6>State: {player.parent.address.state} Zipcode: {player.parent.address.zipcode}</h6>
                <h5 className="text-center underline font-bold mb-2">Emergency Contact</h5>
                {player.emergency.map((emergency) => { 
                return <div key={emergency._id}>
                    <h6>Name: {emergency.name}</h6>
                    <h6>Home Phone: {emergency.phoneMain}</h6>  
                    <h6>Cell Phone: {emergency.phoneAlt}</h6>
                    <h6>Address: {emergency.address.street}</h6>
                    <h6>City: {emergency.address.city}</h6>
                    <h6>State: {emergency.address.state}  Zipcode: {emergency.address.zipcode}</h6>
                    <br />
                </div>})}
                <h5 className="text-center underline font-bold mb-2">Medical Information</h5>
               <h6>{player.medicalCondition}</h6>
            </>
        )
    }
    
    export default PlayerDetailsCard

