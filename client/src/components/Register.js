import React from "react";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";




function Register () {
    const navigate = useNavigate();
    const location = useLocation();
    const [errMsg, setErrMsg] = React.useState('');
    const [formData, setFormData] = React.useState({
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
        playerMedical:"", acknowlegment: false
    })
    //console.log(formData);
    
    function handleChange (e) {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function handleSubmit (e) {
        e.preventDefault();
        try {
            const res = await axios.post('api/players',
                JSON.stringify({
                    formData
                }),
                {
                headers: {
                    "Content-Type": 'application/json',
                    withCredentials: true
                    }
                }
            );
            console.log(`test ${res}`);
            if (res.status === 201){
                navigate('../success');
            }
        }catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else if (err.response?.status === 400) {
                setErrMsg (err.response.data.error);
            }else if (err.response?.status === 500) {
                setErrMsg ('Something went wrong');
            } else {
                setErrMsg ('Registration Failed');
            }
        }
    }

    React.useEffect(() => {
        setErrMsg('');
    },[formData])


    return (
        <div id="registration" className="registration">
            
            <h1>Registration Form</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>Child's Name: <input type="text" onChange={handleChange} name="playerName" value={formData.playerName} required/></label>
                    <label>Child's DOB: <input type="date" onChange={handleChange} name="playerDOB" value={formData.playerDOB} required/></label>
                    <label>Age: <input type="number" min="5" max ="17" onChange={handleChange} name="playerAge" value={formData.playerAge} required/></label>
                    <label htmlFor="playerGrade">Grade: <input id="playerGrade" type="number" min="1" max ="12" onChange={handleChange} name="playerGrade" value={formData.playerGrade}/></label>
                    <br />
                    <label>Parent/Guardian Name: <input type="text" onChange={handleChange} name="parentName" value={formData.parentName} required/></label>
                    <label>School: <input type="text" onChange={handleChange} name="playerSchool" value={formData.playerSchool}/></label>
                    <br />
                    <label>Home Address: <input type="text" onChange={handleChange} name="playerAddress" value={formData.playerAddress} required/></label>
                    <label>City: <input type="text" onChange={handleChange} name="playerCity" value={formData.playerCity}/></label>
                    <label>State: <input type="text" onChange={handleChange} name="playerState" value={formData.playerState}/></label>
                    <label>Zip Code: <input type="text" onChange={handleChange} name="playerZipcode" value={formData.playerZipcode}/></label>
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
                    <label>Zip Code: <input type="text" onChange={handleChange} name="emergencyZipcode1" value={formData.emergencyZipcode1}/></label>
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
                    <label>Zip Code: <input type="text" onChange={handleChange} name="emergencyZipcode2" value={formData.emergencyZipcode2}/></label>
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

                <input type="checkbox" id="acknowlegment" checked={formData.acknowlegment} onChange={handleChange} name="acknowlegment" required/>
                <label htmlFor="acknowlegment">I acknowledge that i have read the Mass All-Starz Waiver of Liability and i have received
                a copy of Mass All-Starz "Rules for Parents and Players" and understand/agree to follow all rules including the "Zero Tolerance" 
                policy. </label>
                <br /><br />
                <p className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <button onClick={handleSubmit}>Register Player</button>

            </form>
        </div>
        
    )
}

export default Register