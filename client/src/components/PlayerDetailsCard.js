const PlayerDetailsCard = ({ x }) => {
        return (
            <>
                <h5 className="text-center underline font-bold mb-2">Player Information</h5>
                <h6>Player's Name: {x.player.name}</h6>
                <h6>DOB: {x.player.dob} Age: {x.player.age}</h6>
                <h6>Sport: {x.sport} Uniform Size: {x.uniformSize}</h6>
                <h6>Parent: {x.player.parent}</h6> 
                <h6>Phone Number: {x.player.phone.main}</h6>
                <h6>Address: {x.player.address.street}</h6>
                <h6>City: {x.player.address.city}</h6>  
                <h6>State: {x.player.address.state} Zipcode: {x.player.address.zipcode}</h6>
                <h5 className="text-center underline font-bold mb-2">Emergency Contact</h5>
                <h6>Person 1 Name: {x.emergencyContact.person1.name}</h6>
                <h6>Home Phone: {x.emergencyContact.person1.phone.main}</h6>  
                <h6>Cell Phone: {x.emergencyContact.person1.phone.alt}</h6>
                <h6>Address: {x.emergencyContact.person1.address.street}</h6>
                <h6>City: {x.emergencyContact.person1.address.city}</h6>
                <h6>State: {x.emergencyContact.person1.address.state}  Zipcode: {x.emergencyContact.person1.address.zipcode}</h6>
             
                <h6>Person 2 Name: {x.emergencyContact.person2.name}</h6>
                <h6>Home Phone: {x.emergencyContact.person2.phone.main}</h6>  
                <h6>Cell Phone: {x.emergencyContact.person2.phone.alt}</h6>
                <h6>Address: {x.emergencyContact.person2.address.street}</h6>
                <h6>City: {x.emergencyContact.person2.address.city}</h6>  
                <h6>State: {x.emergencyContact.person2.address.state} Zipcode: {x.emergencyContact.person2.address.zipcode}</h6>
               
                <h5 className="text-center underline font-bold mb-2">Medical Information</h5>
               <h6>{x.medicalCondition}</h6>
            </>
        )
    }
    
    export default PlayerDetailsCard

