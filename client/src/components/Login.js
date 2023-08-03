import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import axios from '../api/axios.js';



function Login () {
    const userRef = React.useRef();
    const errRef = React.useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "../coach";

    const { setUser } = useUser();

     // Stores login values
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    })

    const [errMsg, setErrMsg] = React.useState((''));

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[loginData])

    // Updates state
    function handleChange (e) {
        const { name, value } = e.target;

        setLoginData(prevData => ({
            ...prevData, [name]: value
        }))
    }

    // api request to validate login
    async function handleSubmit (e) {
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
                    withCredentials: true
                    }
                }
            );
            // stores access token
            setUser({
                user: res.data.user,
                accesstoken: res.data.accessToken,
                admin: res.data.admin
            })
            //Remember to delete*****************************************
            sessionStorage.setItem('JWT', res.data.refreshToken);
            setLoginData({
                email: "",
                password: ""
            })
            navigate('../coach');
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

    return (
        <div className="mainContent">
            <div className="userForm">
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="user" >Email Address: </label>
                    <input id="user" type="email" name="email" ref={userRef} onChange={handleChange} value={loginData.email} required />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="text" name="password" onChange={handleChange} value={loginData.password} required />
                    <br />
                    <button>Login</button>
                    <br />
                    
                </form>
            </div>
        </div>
    )
}

export default Login