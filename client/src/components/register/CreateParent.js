import { useState, useEffect } from "react";
import axios from "../../api/axios";
import useForm from "../../hooks/useForm";
import Input from "../../wraps/Input";
import Button from "../../wraps/Button";

const CreateParent = () => {
    const { formId, setFormId } = useForm();
    const [formData, setFormData] = useState({
        name: "", street: "", city: "", state: "", zipcode: "",
        phoneMain: "", phoneAlt: "", email: "", acknowledgement: false
    });
    const [errMsg, setErrMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    const handleAcknowlege = () => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                acknowledgement: true
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('api/createParent',{
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
                        parentId: res.data,
                        page: 2
                    }
                });
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

    useEffect(() => {
        setErrMsg('');
    },[formData])
    
    return(
        <>
            {!formData.acknowledgement ? <div>
                <p>I acknowledge that I have read the Mass All-Stars Waiver of Liability and I have reviewed
                            a copy of Mass All-Stars "Rules for Parents and Players" and understand/agree to follow all rules including the "Zero Tolerance" 
                            policy.</p>
                        
                <Button handleClick={handleAcknowlege}>I Agree</Button>        
            </div> : <div>
            <Input id="name" label="Parent's Name" value={formData.name} onChange={handleChange} required />
            <Input id="street" label="Address" value={formData.street} onChange={handleChange} required />
            <Input id="city" label="City" value={formData.city} onChange={handleChange} required />
            <Input id="state" label="State" value={formData.state} onChange={handleChange} required />
            <Input id="zipcode" label="ZipCode" value={formData.zipcode} onChange={handleChange} required />
            <Input id="phoneMain" label="Phone Number" value={formData.phoneMain} onChange={handleChange} required />
            <Input id="playerAlt" label="Alternate Phone Number" value={formData.phoneAlt} onChange={handleChange} />
            <Input id="email" label="Email" value={formData.email} onChange={handleChange} />
            <p className={errMsg ? " text-logoRed" : "hidden"} aria-live="assertive">{errMsg}</p>
            <Button id="createParent" handleClick={handleSubmit}>Create Parent</Button>
            </div>}
        </>
    )
}

export default CreateParent;