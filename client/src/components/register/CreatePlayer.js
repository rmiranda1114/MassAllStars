import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useForm from "../../hooks/useForm";
import Input from "../../wraps/Input";
import Button from "../../wraps/Button";
import OverlayBox from "../../wraps/OverlayBox"

const CreatePlayer = () => {
    const { formId, setFormId } = useForm();
    const [formData, setFormData] = useState({
        name: "", dob: "", age: "", grade: "", school: "", sport: "",
        uniformSize: "", prefNum1: "", prefNum2: "", prefNum3: "",
        medicalCondition: "", parent: formId.parentId, emergency: formId.emergencyId
    });
    const [errMsg, setErrMsg] = useState('');
    const [isAddAnother, setIsAddAnother] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('api/createPlayer',{
                    formData: formData
                },
                {
                headers: {
                    "Content-Type": 'application/json'
                    }
                }
            );
            if (res.status === 201){
                setFormId((prevFormId) => {
                    return{
                        ...prevFormId,
                        playerId: [...prevFormId.playerId, res.data]
                    }
                });
                setIsAddAnother(true)
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

    const finalize = async () => {
        try{
            const res = await axios.post('api/finishCreate',{
                    parent: formId.parentId,
                    kids: formId.playerId
                },
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );
            if (res.status === 201) {
                setIsComplete(true);
                setTimeout(() => 
                    setFormId({
                        parentId: null,
                        playerId: [],
                        emergencyId: [],
                        page: 1
                    }), 10000
                );
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const addAnother = (e) => {
        e.preventDefault();
        setFormData({
            name: "", dob: "", age: "", grade: "", school: "", sport: "",
            uniformSize: "", prefNum1: "", prefNum2: "", prefNum3: "",
            medicalCondition: "", parent: formId.parentId, emergency: formId.emergencyId
            });
        if (e.target.id === "no") {
            finalize()
        };
        setIsAddAnother(false);
    }

    useEffect(() => {
        setErrMsg('');
    },[formData])
    
    return(
        <>
            <h5 className=" text-lg font-semibold text-center">Player's Information</h5>
            <Input id="name" label="Player's Name" value={formData.name} onChange={handleChange} required />
            <Input id="dob" label="Player's DOB" value={formData.dob} onChange={handleChange} required type="date" />
            <Input id="age" label="Age" value={formData.age} onChange={handleChange} required />
            <Input id="grade" label="Grade" value={formData.grade} onChange={handleChange} required />
            <Input id="school" label="School" value={formData.school} onChange={handleChange} required />
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
            <Input id="prefNum1" label="Preferred Uniform Number 1" value={formData.prefNum1} onChange={handleChange} required />
            <Input id="prefNum2" label="Preferred Uniform Number 2" value={formData.prefNum2} onChange={handleChange} required />
            <Input id="prefNum3" label="Preferred Uniform Number 3" value={formData.prefNum3} onChange={handleChange} required />
            <label className="block text-sm font-medium">Medical Conditions: </label>
                        <textarea className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" rows="5" placeholder="(i.e. asthma, allergies, medications, etc.)" onChange={handleChange} name="medicalCondition" value={formData.medicalCondition}/>
            <p className={errMsg ? " text-logoRed" : "hidden"} aria-live="assertive">{errMsg}</p>
            <Button id="createEmergency" handleClick={handleSubmit}>Create Player</Button>

            {isAddAnother && <OverlayBox>
                <h6 >Player Added</h6>
                <h6>Would you like to add another?</h6>
                <div className="flex justify-evenly">
                    <Button style={{ width: "w-1/4"}} id={"yes"} handleClick={addAnother}>Yes</Button>
                    <Button style={{ width: "w-1/4"}} id={"no"} handleClick={addAnother}>No</Button>
                </div>
            </OverlayBox>}

            {isComplete && <OverlayBox>
                <h6 className=" text-xl font-semibold my-4">Registration Complete</h6>
                <h6 className="text-logoRed my-4">Page will reset in 10 seconds...</h6>
            </OverlayBox>}
        </>
    )
}

export default CreatePlayer;