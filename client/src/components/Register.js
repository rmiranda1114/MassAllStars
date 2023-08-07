import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";




const Register = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState({
        playerName: "", playerDOB: null, playerAge: null, playerGrade: "",
        parentName: "", playerSchool: "",
        playerAddress: "", playerCity: "", playerState: "", playerZipcode: "",
        playerPhone: "", playerPhone2: "",
        emergencyName1: "", emergencyRelationship1: "",
        emergencyAddress1: "", emergencyCity1: "", emergencyState1: "", emergencyZipcode1: "",
        emergencyHomephone1: "", emergencyCellphone1: "",
        emergencyName2: "", emergencyRelationship2: "",
        emergencyAddress2: "", emergencyCity2: "", emergencyState2: "", emergencyZipcode2: "",
        emergencyHomephone2: "", emergencyCellphone2: "",
        sport: "", uniformSize: "", uniformNumber1: null,
        uniformNumber2: null, uniformNumber3: null,
        playerMedical:"", acknowlegment: false
    })
    const [pageNumber, setPageNumber] = useState(1);
    const [isAddAnother, setIsAddAnother] = useState(false);
    
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
        if (!formData.acknowlegment) {
            setErrMsg('Must acknowledge');
        } else {
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
        }}
    }

    const handlePage = (e) => {
        if (e.target.id == "next") {
            setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
        if (e.target.id == "prev") {
            setPageNumber((prevPageNumber) => prevPageNumber - 1)
        }
    }

    useEffect(() => {
        setErrMsg('');
    },[formData])


    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="my-4 text-xl font-medium text-center">Registration Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="bg-gray-300 p-10 rounded-xl shadow-black shadow-lg mb-8">

                    {/* Page 1 */}
                    {pageNumber == 1 && <>
                        <label className="block text-sm font-medium text-gray-700">Player's Name: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerName" value={formData.playerName} placeholder="Child's Name"required/>
                        <label className="block text-sm font-medium text-gray-700">Players DOB: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="date" onChange={handleChange} name="playerDOB" value={formData.playerDOB} required/>
                        <div className="flex justify-evenly items-center my-4">
                            <label className="block text-sm font-medium" htmlFor="playerAge">Age: </label>
                            <input className=" p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="playerAge" type="number" min="5" max ="17" onChange={handleChange} name="playerAge" value={formData.playerAge} required/>
                            <label className="block text-sm font-medium" htmlFor="playerGrade">Grade: </label>
                            <input className="p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="playerGrade" type="number" min="1" max ="12" onChange={handleChange} name="playerGrade" value={formData.playerGrade}/>
                        </div>
                        <label className="block text-sm font-medium">School: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerSchool" value={formData.playerSchool}/>                    
                        <label className="block text-sm font-medium">Parent/Guardian Name: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="parentName" value={formData.parentName} required/>
                        <label className="block text-sm font-medium">Home Address: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerAddress" value={formData.playerAddress} required/>
                        <label className="block text-sm font-medium">City: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerCity" value={formData.playerCity}/>
                        <div className="flex justify-evenly items-center my-4">
                            <label className="block text-sm font-medium">State: </label>
                            <input className=" w-14 p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerState" value={formData.playerState}/>
                            <label className="block text-sm font-medium">Zip Code: </label>
                            <input className="w-28 p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerZipcode" value={formData.playerZipcode}/>
                        </div>
                        <label className="block text-sm font-medium">Phone Number: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerPhone" value={formData.playerPhone} required/>
                        <label className="block text-sm font-medium">Alternate Phone Number: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="playerPhone2" value={formData.playerPhone2}/>
                    </>}
            
                    {/* Page 2 */}
                    {pageNumber == 2 && <>
                        <legend className="text-center">Emergency Contact</legend>
                        <label className="block text-sm font-medium">Name: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyName1" value={formData.emergencyName1} required/>
                        <label className="block text-sm font-medium">Relationship: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyRelationship1" value={formData.emergencyRelationship1}/>
                        <label className="block text-sm font-medium">Address: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyAddress1" value={formData.emergencyAddress1} required/>
                        <label className="block text-sm font-medium">City: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyCity1" value={formData.emergencyCity1}/>
                        <div className="flex justify-evenly items-center my-4">
                            <label className="block text-sm font-medium">State: </label>
                            <input className=" w-12 p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyState1" value={formData.emergencyState1}/>
                            <label className="block text-sm font-medium">Zip Code: </label>
                            <input className=" w-16 p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyZipcode1" value={formData.emergencyZipcode1}/>
                        </div>
                        <label className="block text-sm font-medium">Home Phone Number: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyHomephone1" value={formData.emergencyHomephone1}/>
                        <label className="block text-sm font-medium">Cell Phone Number: </label>
                        <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyCellphone1" value={formData.emergencyCellphone1}/>
                        
                        <div className="text-xs hover:cursor-pointer hover:text-indigo-500 p-2" onClick={() => setIsAddAnother(isAddAnother ? false : true)}>
                            {isAddAnother ? <span className="text-indigo-500">- Add another</span> : <span>+ Add another</span>}
                        </div>

                        {isAddAnother && <>
                            <legend className="text-center my-4">Second Emergency Contact</legend>
                            <label className="block text-sm font-medium">Name: </label>
                            <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyName2" value={formData.emergencyName2} required/>
                            <label className="block text-sm font-medium">Relationship: </label>
                            <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyRelationship2" value={formData.emergencyRelationship2}/>
                            <label className="block text-sm font-medium">Address: </label>
                            <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyAddress2" value={formData.emergencyAddress2} required/>
                            <label className="block text-sm font-medium">City: </label>
                            <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyCity2" value={formData.emergencyCity2}/>
                            <div className="flex justify-evenly items-center my-4">
                                <label className="block text-sm font-medium">State: </label>
                                <input className=" w-14 p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyState2" value={formData.emergencyState2}/>
                                <label className="block text-sm font-medium">Zip Code: </label>
                                <input className=" w-14 p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyZipcode2" value={formData.emergencyZipcode2}/>
                            </div>
                            <label className="block text-sm font-medium">Home Phone Number: </label>
                            <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyHomephone2" value={formData.emergencyHomephone2}/>
                            <label className="block text-sm font-medium">Cell Phone Number: </label>
                            <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" onChange={handleChange} name="emergencyCellphone2" value={formData.emergencyCellphone2}/>
                        </>}
                    </>}


                    {/* Page 3 */}
                    {pageNumber == 3 && <>
                        <label className="block text-sm font-medium" htmlFor="sport">Sport: </label>
                        <select className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="sport" value={formData.sport} onChange={handleChange} name="sport">
                            <option value="">--Choose One--</option>
                            <option value="Soccer">Soccer</option>
                            <option value="Basketball">Basketball</option>
                        </select>
                        <label className="block text-sm font-medium" htmlFor="uniformSize">Uniform Size: </label>
                        <select className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="uniformSize" value={formData.uniformSize} onChange={handleChange} name="uniformSize">
                            <option value="">--Choose One--</option>
                            <option value="YXS">Youth Extra Small</option>
                            <option value="YS">Youth Small</option>
                            <option value="YM">Youth Medium</option>
                            <option value="YL">Youth Large</option>
                            <option value="YXL">Youth Extra Large</option>
                            <option value="AS">Adult Small</option>
                            <option value="AM">Adult Medium</option>
                            <option value="AL">Adult Large</option>
                            <option value="AXL">Adult Extra Large</option>
                        </select>
                        <legend className="block text-sm font-medium">Preferred Uniform Number</legend>
                        <div className="flex justify-evenly">
                            <label className="text-xs" htmlFor="uniformNumber">1st: </label>
                            <input className="w-12 p-1 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="uniformNumber1" type="number" min="0" max ="99" onChange={handleChange} name="uniformNumber1" value={formData.uniformNumber1} required/>
                            <label className="text-xs" htmlFor="uniformNumber">2nd: </label>
                            <input className="w-12 p-1 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="uniformNumber2" type="number" min="0" max ="99" onChange={handleChange} name="uniformNumber2" value={formData.uniformNumber2} />
                            <label className="text-xs" htmlFor="uniformNumber">3rd: </label>
                            <input className="w-12 p-1 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="uniformNumber3" type="number" min="0" max ="99" onChange={handleChange} name="uniformNumber3" value={formData.uniformNumber3} />

                        </div>
                        <label className="block text-sm font-medium">Medical Conditions: </label>
                        <textarea className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" rows="5" placeholder="(i.e. asthma, allergies, medications, etc.)" onChange={handleChange} name="playerMedical" value={formData.playerMedical}/>
                        <input type="checkbox" id="acknowlegment" checked={formData.acknowlegment} onChange={handleChange} name="acknowlegment" required/>
                        <label htmlFor="acknowlegment"> I acknowledge that I have read the Mass All-Stars Waiver of Liability and I have reviewed
                            a copy of Mass All-Stars "Rules for Parents and Players" and understand/agree to follow all rules including the "Zero Tolerance" 
                            policy.
                        </label>
                        
                        <p className={errMsg ? " text-logoRed" : "hidden"} aria-live="assertive">{errMsg}</p>
                        <button className="bg-indigo-400 text-white rounded-xl p-2 hover:text-blue-700 w-full mt-4" onClick={handleSubmit}>
                            Register Player
                        </button>
                    </>}

                    <div className="flex justify-evenly text-blue-600 mt-4">
                        <span id="prev" className={pageNumber == 1 ? "text-slate-600" : "hover:cursor-pointer"} onClick={pageNumber == 1 ? null : handlePage}>prev page</span>
                        <span>|</span>
                        <span id="next" className={pageNumber == 3 ? "text-slate-600" : "hover:cursor-pointer"} onClick={pageNumber == 3 ? null : handlePage}>next page</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register