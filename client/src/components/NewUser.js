import { useState, useEffect, useRef }from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;

const NewUser = () => {
    const axiosPrivate = useAxiosPrivate();
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //Set focus for screenreaders
    useEffect(() => {
        userRef.current.focus();
    },[])

   //Test username every time it is changed
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    },[email])

    //Test password and confirm password whenever either are changed
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd, matchPwd])

    //Resets error once its been read and update begins 
    useEffect(() => {
        setErrMsg('');
    },[email, pwd, matchPwd])

    async function handleSubmit (e) {
        e.preventDefault();
        //prevent button enable with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        let isMounted = true;
        const controller = new AbortController();
        try{
            let response = await axiosPrivate.post('/api/users', {
                signal: controller.signal,
                name: name,
                email: email,
                password: pwd 
            });
            if (isMounted) {
                setName('');
                setEmail('');
                setPwd('');
                setMatchPwd('');
                setSuccess(true);
            }
        }
        catch (err){
            if (!err?.response) {
                setErrMsg('No Server Response');
            }else if (err.response?.status === 409) {
                setErrMsg ('Email already used');
            }else if (err.response?.status === 400) {
                setErrMsg ('Unable to Validate');
            } else {
                setErrMsg ('Registration Failed');
            }
            errRef.current.focus();
        }
        return() => {
            isMounted = false;
            controller.abort();
        }
    }


    return (
        <div className="my-8 mx-auto max-w-lg flex-col bg-gray-300 p-7 rounded-xl shadow-black shadow-lg text-base font-medium">
            {success ? ( <h1 className="text-center p-8">New Coach successfully created.</h1> ) : (
            <div id="newCoach" className="userForm">
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                <h5 className="text-center underline font-bold mb-2">Create New Coach</h5>
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="newName">New Coach Name: </label>
                    <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" ref={userRef} id="newName" autoComplete="off" onChange={(e) => setName(e.target.value)}
                     value={name} />

                    <label className="block text-sm font-medium text-gray-700" htmlFor="userEmail">Email Address: 
                        <span className={validEmail ? "text-green-500" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} />    
                        </span>
                        <span className={validEmail || !email ? "hidden" : "text-logoRed"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>     
                    </label>
                    <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="text" id="userEmail" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                        required aria-invalid={validEmail ? "false" : "true"} onFocus={() => setUserFocus(true)} 
                        onBlur={() => setUserFocus (false)} value={email} />
                        
                    <br />

                    <label className="block text-sm font-medium text-gray-700" htmlFor="userPwd">Password: 
                        <span className={validPwd ? "text-green-500" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} />    
                        </span>
                        <span className={validPwd || !pwd ? "hidden" : "text-logoRed"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="password" id="userPwd" onChange={(e) => setPwd(e.target.value)} required 
                        aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} 
                        onBlur={() => setPwdFocus (false)} value={pwd}/> 
                            

                    <p id="pwdnote" className= {pwdFocus && !validPwd ? "text-logoRed" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        6 to 16 characters. <br />
                        Must include uppercase and lowercase letters and a number.
                    </p>  

                    <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPwd">Confirm Password: 
                        <span className={validMatch && matchPwd ? "text-green-500" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} />    
                        </span>
                        <span className={validMatch || !matchPwd ? "hidden" : "text-logoRed"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> 
                    </label>
                    <input className="w-full p-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-400" type="password" id="confirmPwd" onChange={(e) => setMatchPwd(e.target.value)} required 
                        aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} 
                        onBlur={() => setMatchFocus (false)} value={matchPwd}/>
                           

                    <p id="confirmnote" className= {matchFocus && !validMatch ? "text-logoRed" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button className="w-full p-2 bg-gray-400 rounded-lg mt-2" disabled={!validEmail || !validPwd || !validMatch ? true : false}>
                        Create    
                    </button>             
                    
                </form>
            </div>)
        }</div>
    )       
}

export default NewUser;