import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useForm from "../../hooks/useForm";
import Input from "../../wraps/Input";
import Button from "../../wraps/Button";
import OverlayBox from "../../wraps/OverlayBox"

const CreateEmergency = () => {
    const { formId, setFormId } = useForm();
    const [formData, setFormData] = useState({
        name: "", street: "", city: "", state: "", zipcode: "",
        phoneMain: "", phoneAlt: "", relationship: ""
    });
    const [errMsg, setErrMsg] = useState('');
    const [isAddAnother, setIsAddAnother] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('api/createEmergency',
                JSON.stringify({
                    formData
                }),
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
                        emergencyId: [...prevFormId.emergencyId, res.data]
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

    const addAnother = (e) => {
        e.preventDefault();
        setFormData({
                name: "", street: "", city: "", state: "", zipcode: "",
                phoneMain: "", phoneAlt: "", relationship: ""
            });
        if (e.target.id === "no") {
            setFormId((prevFormId) => {
                return{
                    ...prevFormId,
                    page: 3
                }
            });
        };
        setIsAddAnother(false);
    }

    useEffect(() => {
        setErrMsg('');
    },[formData])
    
    return(
        <>
            <h5 className=" text-lg font-semibold text-center">Emergency Contact</h5>
            <Input id="name" label="Name" value={formData.name} onChange={handleChange} required />
            <Input id="relationship" label="Relationship" value={formData.relationship} onChange={handleChange} required />
            <Input id="street" label="Address" value={formData.street} onChange={handleChange} required />
            <Input id="city" label="City" value={formData.city} onChange={handleChange} required />
            <Input id="state" label="State" value={formData.state} onChange={handleChange} required />
            <Input id="zipcode" label="ZipCode" value={formData.zipcode} onChange={handleChange} required />
            <Input id="phoneMain" label="Phone Number" value={formData.phoneMain} onChange={handleChange} required />
            <Input id="playerAlt" label="Alternate Phone Number" value={formData.phoneAlt} onChange={handleChange} />
            <p className={errMsg ? " text-logoRed" : "hidden"} aria-live="assertive">{errMsg}</p>
            <Button id="createEmergency" handleClick={handleSubmit}>Create Contact</Button>

            {isAddAnother && <OverlayBox>
                    <h6>Emergency Contact Added</h6>
                    <h6>Would you like to add another?</h6>
                    <div className="flex justify-evenly">
                        <Button style={{ width: "w-1/4"}} id={"yes"} handleClick={addAnother}>Yes</Button>
                        <Button style={{ width: "w-1/4"}} id={"no"} handleClick={addAnother}>No</Button>
                    </div>
                </OverlayBox>}
            
        </>
    )
}

export default CreateEmergency;