import React from "react";
import { useNavigate } from "react-router-dom";

function Update ({ selectPlayer, setSelectPlayer }) {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        id: "",
        playerName: "", playerDOB: "", playerAge: "", playerGrade: "",
        parentName: "", playerSchool: "",
        playerAddress: "", playerCity: "", playerState: "", playerZipcode: "",
        playerPhone: "", playerPhone2: "",
        emergencyName1: "", emergencyRelationship1: "",
        emergencyAddress1: "", emergencyCity1: "", emergencyState1: "", emergencyZipcode1: "",
        emergencyHomephone1: "", emergencyCellphone1: "",
        emergencyName2: "", emergencyRelationship2: "",
        emergencyAddress2: "", emergencyCity2: "", emergencyState2: "", emergencyZipcode2: "",
        emergencyHomephone2: "", emergencyCellphone2: "",
        sport: "", uniformSize: "",
        playerMedical:""
    })

    function handleChange (e) {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    React.useEffect(()=> {
        setFormData({
            id: selectPlayer._id,
            playerName: selectPlayer.player.name, playerDOB: selectPlayer.player.dob, playerAge: selectPlayer.player.age, playerGrade: selectPlayer.player.grade,
            parentName: selectPlayer.player.parent, playerSchool: selectPlayer.player.school, playerAddress: selectPlayer.player.address.street,
            playerCity: selectPlayer.player.address.city, playerState: selectPlayer.player.address.state, playerZipcode: selectPlayer.player.address.zipcode,
            playerPhone: selectPlayer.player.phone.main,  playerPhone2: selectPlayer.player.phone.alt, emergencyName1: selectPlayer.emergencyContact.person1.name,
            emergencyRelationship1: selectPlayer.emergencyContact.person1.relationship, emergencyAddress1: selectPlayer.emergencyContact.person1.address.street,
            emergencyCity1: selectPlayer.emergencyContact.person1.address.city, emergencyState1: selectPlayer.emergencyContact.person1.address.state,
            emergencyZipcode1: selectPlayer.emergencyContact.person1.address.zipcode, emergencyHomephone1: selectPlayer.emergencyContact.person1.phone.main, 
            emergencyCellphone1: selectPlayer.emergencyContact.person1.phone.alt, emergencyName2: selectPlayer.emergencyContact.person2.name, 
            emergencyRelationship2: selectPlayer.emergencyContact.person2.relationship, emergencyAddress2: selectPlayer.emergencyContact.person2.address.street,
            emergencyCity2: selectPlayer.emergencyContact.person2.address.city, emergencyState2: selectPlayer.emergencyContact.person2.address.state,
            emergencyZipcode2: selectPlayer.emergencyContact.person2.address.zipcode, emergencyHomephone2: selectPlayer.emergencyContact.person2.phone.main,
            emergencyCellphone2: selectPlayer.emergencyContact.person2.phone.alt, sport: selectPlayer.sport, uniformSize: selectPlayer.uniformSize,
            playerMedical: selectPlayer.medicalCondition
        })
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/update', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                formData
            })
            //converts back to Json
        })
        console.log(res);
        if (res.status === 200){
            navigate('../../success');
        }
       
    }
    

    

    return (
        <form onSubmit={handleSubmit}>
        <fieldset>
            <label>Child's Name: <input type="text" onChange={handleChange} name="playerName" value={formData.playerName} required/></label>
            <label>Child's DOB: <input type="date" onChange={handleChange} name="playerDOB" value={formData.playerDOB} required/></label>
            <label>Age: <input type="number" min="5" max ="17" onChange={handleChange} name="playerAge" value={formData.playerAge} required/></label>
            <label htmlFor="playerGrade">Grade: <input id="playerGrade" type="text" onChange={handleChange} name="playerGrade" value={formData.playerGrade}/></label>
            <br />
            <label>Parent/Guardian Name: <input type="text" onChange={handleChange} name="parentName" value={formData.parentName} required/></label>
            <label>School: <input type="text" onChange={handleChange} name="playerSchool" value={formData.playerSchool}/></label>
            <br />
            <label>Home Address: <input type="text" onChange={handleChange} name="playerAddress" value={formData.playerAddress} required/></label>
            <label>City: <input type="text" onChange={handleChange} name="playerCity" value={formData.playerCity}/></label>
            <label>State: <input type="text" onChange={handleChange} name="playerState" value={formData.playerState}/></label>
            <label>Zip Code: <input type="number" onChange={handleChange} name="playerZipcode" value={formData.playerZipcode}/></label>
            <br />
            <label>Phone Number: <input type="text" onChange={handleChange} name="playerPhone" value={formData.playerPhone} required/></label>
            <label>Alternate Phone Number: <input type="text" onChange={handleChange} name="playerPhone2" value={formData.playerPhone2}/></label>
        </fieldset>
        
        <br /><br />
        <fieldset>
            <legend>Emergency Contact</legend>
            <br />
            <label>(1) Name: <input type="text" onChange={handleChange} name="emergencyName1" value={formData.emergencyName1} required/></label>
            <label>Relationship: <input type="text" onChange={handleChange} name="emergencyRelationship1" value={formData.emergencyRelationship1}/></label>
            <br />
            <label>Address: <input type="text" onChange={handleChange} name="emergencyAddress1" value={formData.emergencyAddress1} required/></label>
            <label>City: <input type="text" onChange={handleChange} name="emergencyCity1" value={formData.emergencyCity1}/></label>
            <label>State: <input type="text" onChange={handleChange} name="emergencyState1" value={formData.emergencyState1}/></label>
            <label>Zip Code: <input type="number" onChange={handleChange} name="emergencyZipcode1" value={formData.emergencyZipcode1}/></label>
            <br />
            <label>Home Phone Number: <input type="text" onChange={handleChange} name="emergencyHomephone1" value={formData.emergencyHomephone1}/></label>
            <label>Cell Phone Number: <input type="text" onChange={handleChange} name="emergencyCellphone1" value={formData.emergencyCellphone1}/></label>
            <br /><br />
            <label>(2) Name: <input type="text" onChange={handleChange} name="emergencyName2" value={formData.emergencyName2}/></label>
            <label>Relationship: <input type="text" onChange={handleChange} name="emergencyRelationship2" value={formData.emergencyRelationship2}/></label>
            <br />
            <label>Address: <input type="text" onChange={handleChange} name="emergencyAddress2" value={formData.emergencyAddress2}/></label>
            <label>City: <input type="text" onChange={handleChange} name="emergencyCity2" value={formData.emergencyCity2}/></label>
            <label>State: <input type="text" onChange={handleChange} name="emergencyState2" value={formData.emergencyState2}/></label>
            <label>Zip Code: <input type="number" onChange={handleChange} name="emergencyZipcode2" value={formData.emergencyZipcode2}/></label>
            <br />
            <label>Home Phone Number: <input type="text" onChange={handleChange} name="emergencyHomephone2" value={formData.emergencyHomephone2}/></label>
            <label>Cell Phone Number: <input type="text" onChange={handleChange} name="emergencyCellphone2" value={formData.emergencyCellphone2}/></label>
        </fieldset>
        <br />

        <label htmlFor="sport">Sport: </label>
        <select id="sport" value={formData.sport} onChange={handleChange} name="sport">
            <option value="">--Choose One--</option>
            <option value="Soccer">Soccer</option>
            <option value="Basketball">Basketball</option>
        </select>
        <br /><br />

        <fieldset>
            <legend>Uniform Size</legend>
            <input type="radio" id="uniformSizeYXS" name="uniformSize" value="YXS" onChange={handleChange} checked={formData.uniformSize === "YXS"}/>
            <label htmlFor="uniformSizeYXS">Youth X-Small</label>
            <input type="radio" id="uniformSizeYS" name="uniformSize" value="YS" onChange={handleChange} checked={formData.uniformSize === "YS"}/>
            <label htmlFor="uniformSizeYS">Youth Small</label>
            <input type="radio" id="uniformSizeYM" name="uniformSize" value="YM" onChange={handleChange} checked={formData.uniformSize === "YM"}/>
            <label htmlFor="uniformSizeYM">Youth Medium</label>
            <input type="radio" id="uniformSizeYL" name="uniformSize" value="YL" onChange={handleChange} checked={formData.uniformSize === "YL"}/>
            <label htmlFor="uniformSizeYL">Youth Large</label>
            <input type="radio" id="uniformSizeYXL" name="uniformSize" value="YXL" onChange={handleChange} checked={formData.uniformSize === "YXL"}/>
            <label htmlFor="uniformSizeYXL">Youth X-Large</label>
            <br />
            <input type="radio" id="uniformSizeAS" name="uniformSize" value="AS" onChange={handleChange} checked={formData.uniformSize === "AS"}/>
            <label htmlFor="uniformSizeYAS">Adult Small</label>
            <input type="radio" id="uniformSizeAM" name="uniformSize" value="AM" onChange={handleChange} checked={formData.uniformSize === "AM"}/>
            <label htmlFor="uniformSizeAM">Adult Medium</label>
            <input type="radio" id="uniformSizeAL" name="uniformSize" value="AL" onChange={handleChange} checked={formData.uniformSize === "AL"}/>
            <label htmlFor="uniformSizeAL">Adult Large</label>
            <input type="radio" id="uniformSizeAXL" name="uniformSize" value="AXL" onChange={handleChange} checked={formData.uniformSize === "AXL"}/>
            <label htmlFor="uniformSizeAXL">Adult X-Large</label>
        </fieldset><br />

        <label>Medical Conditions: <br />
            <textarea rows="5" cols="70" placeholder="(i.e. asthma, allergies, medications, etc.)" onChange={handleChange} name="playerMedical" value={formData.playerMedical}/>
        </label>
        <br />
        <button type="button" onClick={() => setSelectPlayer(null)}>Go Back</button><span> </span><button type="submit" >Update Player</button>
    </form>
    )
}

export default Update;