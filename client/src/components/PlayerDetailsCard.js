function PlayerDetailsCard ({ x }) {
        return (
            <div className="playerDetailsCard" >
                <h6>Player Information</h6>
                <br />
                <p>Player's Name: <span>{x.player.name}</span> DOB: <span>{x.player.dob}</span> Age:<span>{x.player.age}</span> </p>
                <p>Sport: <span>{x.sport}</span> Uniform Size: <span>{x.uniformSize}</span></p>
                <p>Parent: <span>{x.player.parent}</span> Phone Number: <span>{x.player.phone.main}</span></p>
                <p>Address: <span>{x.player.address.street}</span> City: <span>{x.player.address.city}</span>  
                        State: <span>{x.player.address.state}</span>  Zipcode: <span>{x.player.address.zipcode}</span></p>
                <hr />
                <h6>Emergency Contacts</h6>
                <br />
                <p>Person 1 Name: <span>{x.emergencyContact.person1.name}</span> Home Phone: <span>{x.emergencyContact.person1.phone.main}</span>  
                        Cell Phone: <span>{x.emergencyContact.person1.phone.alt}</span></p>
                <p>Address: <span>{x.emergencyContact.person1.address.street}</span> City: <span>{x.emergencyContact.person1.address.city}</span>  
                        State: <span>{x.emergencyContact.person1.address.state}</span>  Zipcode: <span>{x.emergencyContact.person1.address.zipcode}</span></p>
                <br />
                <p>Person 2 Name: <span>{x.emergencyContact.person2.name}</span> Home Phone: <span>{x.emergencyContact.person2.phone.main}</span>  
                        Cell Phone: <span>{x.emergencyContact.person2.phone.alt}</span></p>
                <p>Address: <span>{x.emergencyContact.person2.address.street}</span> City: <span>{x.emergencyContact.person2.address.city}</span>  
                        State: <span>{x.emergencyContact.person2.address.state}</span>  Zipcode: <span>{x.emergencyContact.person2.address.zipcode}</span></p>
                <hr />
                <h6>Medical Information</h6>
                <br />
                <p>{x.medicalCondition}</p>
            </div>
        )
    }
    
    export default PlayerDetailsCard

