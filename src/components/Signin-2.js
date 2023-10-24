import React, { useEffect, useState } from "react";
import "../style/Signin.css"
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectSigninFirstName,
    selectSigninLastname,
    selectSigninEmail,
    selectSigninPassword,
    selectSigninDisableSubmit,
    selectSigninRegisterStatus,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setDisableSubmit,
    resetSiginStates,
    registerUser 
} from "../state/slices/signinSlice";
const  baseEyeIcon = "fa-solid fa-eye";

export default function Signin2() {
    const dispatch = useDispatch()
    const {signinToken} = useParams()
    const [ watchPasswordIcon, setWatchpasswordIcon ] = useState(baseEyeIcon+"-slash")
    const [passUpper, setPassUpper] = useState(null)
    const [passLower, setPassLower] = useState(null)
    const [passDigit, setPassDigit] = useState(null)
    const [passEightchars, setPassEightchars] = useState(null)
    const [passNospaces, setPassNospaces] = useState(null)
    const firstName = useSelector(selectSigninFirstName);
    const lastName = useSelector(selectSigninLastname);
    // const email = useSelector(selectSigninEmail);
    const password = useSelector(selectSigninPassword);
    const disableSubmit = useSelector(selectSigninDisableSubmit);
    const registerStatus = useSelector(selectSigninRegisterStatus)

    const canSubmit = () => {
        // if (firstName && lastName && email  && password) {
        //     if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(password)){
        //         dispatch(setDisableSubmit(false))
        //         return
        //     } else {
        //         dispatch(setDisableSubmit(true))
        //         return
        //     }
        // } else {
        //     dispatch(setDisableSubmit(true))
        //     return
        // }
        if (firstName && lastName && password) {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$/.test(password)){
                dispatch(setDisableSubmit(false))
                return
            } else {
                dispatch(setDisableSubmit(true))
                return
            }
        } else {
            dispatch(setDisableSubmit(true))
            return
        }
    }

    const checkPatternUppercase = () => {
        if (/(?=.*[A-Z])/.test(password)) {
            setPassUpper(true)
            return
        } else {
            setPassUpper(false)
            return
        }
    }

    const checkPatternLowercase = () => {
        if (/(?=.*[a-z])/.test(password)) {
            setPassLower(true)
            return
        } else {
            setPassLower(false)
            return
        } 
    }

    const checkPatternDigit = () => {
        if (/(?=.*\d)/.test(password)) {
            setPassDigit(true)
        } else {
            setPassDigit(false)
        }
    }

    const checkPatternNospaces = () => {
        if (/^(?!.*\s)/.test(password)) {
            setPassNospaces(true)
        } else {
            setPassNospaces(false)
        }
    }

    const checkPatternEightchars = () => {
        if (/^.{8,}$/.test(password)) {
            setPassEightchars(true)
        } else {
            setPassEightchars(false)
        }
    }
    
    // useEffect(()=> {
    //     canSubmit()
    // }, [firstName, lastName, email, password])

    useEffect(()=> {
        canSubmit()
    }, [firstName, lastName, password])

    useEffect(()=> {
        checkPatternUppercase()
        checkPatternLowercase()
        checkPatternDigit()
        checkPatternEightchars()
        checkPatternNospaces()
    }, [password])

    const handleChange = (event) => {
        // const id = event.target.id;
        // switch(id){
        //     case "signin-firstname":
        //         dispatch(setFirstName(event.target.value))
        //         break;
        //     case "signin-lastname":
        //         dispatch(setLastName(event.target.value))
        //         break;
        //     case "signin-email":
        //         dispatch(setEmail(event.target.value))
        //         break;
        //     default:
        //         dispatch(setPassword(event.target.value))
        //         break;
        // }
        const id = event.target.id;
        switch(id){
            case "signin-firstname":
                dispatch(setFirstName(event.target.value))
                break;
            case "signin-lastname":
                dispatch(setLastName(event.target.value))
                break;
            default:
                dispatch(setPassword(event.target.value))
                break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(registerUser(Object.fromEntries(data)))
    }

    if (!registerStatus) {
       return (
        <>  
            <section id="signin-container">
                
                <form onSubmit={handleSubmit} autoComplete="off">
                <h1>Finish Up</h1>
                <h2>Let's complete your registration</h2>
                    {/* <label htmlFor="signin-firstname">First name</label> */}
                    <input type="hidden" name="signinToken" value={signinToken.toString()}></input>
                    <input type="text" name="firstName" id="signin-firstname" value={firstName} onChange={handleChange} placeholder="First Name" required></input>
                    {/* <label htmlFor="signin-lastname">Last name</label> */}
                    <input type="text" name="lastName" id="signin-lastname" value={lastName} onChange={handleChange} placeholder="Last Name" required></input>
                    {/* <label htmlFor="signin-email">E-mail</label> */}
                    {/* <input type="email" name="email" id="signin-email" value={email} onChange={handleChange} placeholder="Email" required></input> */}
                    {/* <label htmlFor="signin-password">Password <span style={{fontSize: "0.7rem"}}>(1 lowercase - 1 capital letter - 1 number - at least 8 characters long)</span></label> */}
                    <div id="signin-password-container">
                        <input type={watchPasswordIcon === baseEyeIcon ? "text" : "password"}  name="password" id="signin-password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,}$" value={password} onChange={handleChange} placeholder="Password" required></input><span><i className={watchPasswordIcon} onClick={()=>setWatchpasswordIcon(watchPasswordIcon === baseEyeIcon ? baseEyeIcon+"-slash" : baseEyeIcon)}></i> </span>
                    </div>
                    <p id="signin-password-pattern">At least : <span style={{color: passUpper === null ? "rgb(131, 130, 130)" : passUpper === false ? "red" : "green"}}>• 1 Capital letter</span> | <span style={{color: passLower === null ? "rgb(131, 130, 130)" : passLower === false ? "red" : "green"}}>• 1 Lowercase letter</span> | <span style={{color: passDigit === null ? "rgb(131, 130, 130)" : passDigit === false ? "red" : "green"}}>• 1 Number</span> | <span style={{color: passEightchars === null ? "rgb(131, 130, 130)" : passEightchars === false ? "red" : "green"}}>• 8 character long</span> | <span style={{color: passNospaces === null ? "rgb(131, 130, 130)" : passNospaces === false ? "red" : "green"}}>• No spaces</span></p>
                    {/* <label htmlFor="signin-confirmPassword">Confirm Password</label> */}
                    {/* <input type="password" name="confirmPassword" id="signin-confirmPassword" value={confirmPassword} onChange={handleChange}  placeholder="Confirm Password" required></input> */}
                    <button type="submit" disabled={disableSubmit}>Create account</button>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </form>
                
            </section>
            
        </>
        ) 
    } else if (registerStatus === 201) {
        return (
            <>
                <h1>Your account has been created successfully!</h1>
                <Link to="/login">Log in</Link>
            </>
        )
    } else if (registerStatus === 409) {
        
        
        return (
            <>
                {/* <h1>{`An account has already been registered with the e-mail ${email}`}</h1>
                <Link to="/signin" onClick={()=> dispatch(resetSiginStates())}>Try again</Link> */}
            </>
        )
    } else {
        return (
            <>
                <h1>Unfortunately we had an issue creating your account</h1>
                <Link to="/signin" onClick={()=> dispatch(resetSiginStates())}>Try Again</Link>
            </>
        )
    }
    
}