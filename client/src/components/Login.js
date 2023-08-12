import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import axios from '../api/axios.js';
import FlexContainer from "../wraps/FlexContainer.js";
import Button from "../wraps/Button.js";
import Input from "../wraps/Input.js";



function Login () {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "../coach";
    const { setUser } = useUser();
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [errMsg, setErrMsg] = useState((''));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData, [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('api/login',
                JSON.stringify({
                    email: loginData.email,
                    password: loginData.password
                }),
                {
                headers: {
                    "Content-Type": 'application/json',
                    },
                withCredentials: true
                }
            );
            setUser({
                _id: res.data._id,
                user: res.data.user,
                accesstoken: res.data.accessToken,
                admin: res.data.admin
            })
            res.data.admin ? navigate('../coach') : navigate('../players');
        }catch (err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            }else if (err.response?.status === 401) {
                setErrMsg('Invalid Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[loginData])

    return (
        <FlexContainer>
            <p ref={errRef} className={errMsg ? "flex" : "hidden"} aria-live="assertive">{errMsg}</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-700" htmlFor="user" >Email Address: </label>
                <div  className="mt-1">
                    <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="user" type="email" name="email" ref={userRef} onChange={handleChange} value={loginData.email} required />
                </div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password: </label>
                <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" id="password" type="text" name="password" onChange={handleChange} value={loginData.password} required />
                
                <Button bg="bg-indigo-400" otherStyle="text-white hover:text-blue-700" handleClick={handleSubmit}>Login</Button>
                
            </form>
        </FlexContainer>
    )
}

export default Login