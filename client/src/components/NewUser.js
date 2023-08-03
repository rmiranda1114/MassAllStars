import React from "react";
import useUser from "../hooks/useUser.js"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;

function NewUser () {
    const userRef = React.useRef();
    const errRef = React.useRef();
    const { user } = useUser();

    const [name, setName] = React.useState('');

    const [email, setEmail] = React.useState('');
    const [validEmail, setValidEmail] = React.useState(false);
    const [userFocus, setUserFocus] = React.useState(false);

    const [pwd, setPwd] = React.useState('');
    const [validPwd, setValidPwd] = React.useState(false);
    const [pwdFocus, setPwdFocus] = React.useState(false);

    const [matchPwd, setMatchPwd] = React.useState('');
    const [validMatch, setValidMatch] = React.useState(false);
    const [matchFocus, setMatchFocus] = React.useState(false);

    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    //Set focus for screenreaders
    React.useEffect(() => {
        userRef.current.focus();
    },[])

   //Test username every time it is changed
    React.useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    },[email])

    //Test password and confirm password whenever either are changed
    React.useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd, matchPwd])

    //Resets error once its been read and update begins 
    React.useEffect(() => {
        setErrMsg('');
    },[email, pwd, matchPwd])

    async function handleSubmit (e) {
        e.preventDefault();
        if(!user.admin) {
            setErrMsg('Unauthorized');
            return;
        }
        //prevent button enable with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            let response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json',
                    "authorization": user.accesstoken
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: pwd 
                })
            })
            setName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
            response.status == 200 ? setSuccess(true) : new Error('Unable to Register');
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
    
        

    }



    return (
        <div  className="newUser ">{success ? ( <div><h1>New Coach successfully created.</h1></div> ) : (
            <div id="newCoach" className="userForm">
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                <h1>Create New Coach</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newName">New Coach Name: </label>
                    <input type="text" ref={userRef} id="newName" autoComplete="off" onChange={(e) => setName(e.target.value)}
                     value={name} />

                    <label htmlFor="userEmail">Email Address: 
                        <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />    
                        </span>
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>     
                    </label>
                    <input type="text" id="userEmail" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)}
                        required aria-invalid={validEmail ? "false" : "true"} onFocus={() => setUserFocus(true)} 
                        onBlur={() => setUserFocus (false)} value={email} />
                        
                    <br />

                    <label htmlFor="userPwd">Password: 
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />    
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input type="password" id="userPwd" onChange={(e) => setPwd(e.target.value)} required 
                        aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} 
                        onBlur={() => setPwdFocus (false)} value={pwd}/> 
                            

                    <p id="pwdnote" className= {pwdFocus && !validPwd ? "insctructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        6 to 16 characters. <br />
                        Must include uppercase and lowercase letters and a number.
                    </p>  

                    <label htmlFor="confirmPwd">Confirm Password: 
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />    
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> 
                    </label>
                    <input type="password" id="confirmPwd" onChange={(e) => setMatchPwd(e.target.value)} required 
                        aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} 
                        onBlur={() => setMatchFocus (false)} value={matchPwd}/>
                           

                    <p id="confirmnote" className= {matchFocus && !validMatch ? "insctructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>
                        Create New Coach    
                    </button>             
                    
                </form>
            </div>)
        }</div>
    )       
}

export default NewUser;