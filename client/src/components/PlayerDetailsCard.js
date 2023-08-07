const PlayerDetailsCard = ({ player }) => {
    
        return (
            <>
                <h5 className="text-center underline font-bold mb-2">Player Information</h5>
                <h6>Player's Name: {player.name}</h6>
                <h6>DOB: {player.dob} Age: {player.age}</h6>
                <h6>Sport: {player.sport} Uniform Size: {player.uniformSize}</h6>
                <h6>Parent: {player.parentId.name}</h6> 
                <h6>Phone Number: {player.parentId.phoneMain}</h6>
                <h6>Address: {player.parentId.address.street}</h6>
                <h6>City: {player.parentId.address.city}</h6>  
                <h6>State: {player.parentId.address.state} Zipcode: {player.parentId.address.zipcode}</h6>
                <h5 className="text-center underline font-bold mb-2">Emergency Contact</h5>
                <h6>Person 1 Name: {player.emergencyContact.name}</h6>
                <h6>Home Phone: {player.emergencyContact.phoneMain}</h6>  
                <h6>Cell Phone: {player.emergencyContact.phoneAlt}</h6>
                <h6>Address: {player.emergencyContact.address.street}</h6>
                <h6>City: {player.emergencyContact.address.city}</h6>
                <h6>State: {player.emergencyContact.address.state}  Zipcode: {player.emergencyContact.address.zipcode}</h6>
             
                {/* <h6>Person 2 Name: {emergencyContact.person2.name}</h6>
                <h6>Home Phone: {emergencyContact.person2.phone.main}</h6>  
                <h6>Cell Phone: {emergencyContact.person2.phone.alt}</h6>
                <h6>Address: {emergencyContact.person2.address.street}</h6>
                <h6>City: {emergencyContact.person2.address.city}</h6>  
                <h6>State: {emergencyContact.person2.address.state} Zipcode: {emergencyContact.person2.address.zipcode}</h6>  */}
               
                <h5 className="text-center underline font-bold mb-2">Medical Information</h5>
               <h6>{player.medicalCondition}</h6>
            </>
        )
    }
    
    export default PlayerDetailsCard

