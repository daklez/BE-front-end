import React, { useEffect, useState } from "react";
import googleLogo from "../assets/images/google-logo.png"
import microsoftLogo from "../assets/images/microsoft-logo.png"
import "../style/Login.css"
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectLoginEmail,
    selectLoginPassword,
    selectLoginDisableSubmit,
    selectLoginStatus,
    setEmail,
    setPassword,
    setDisableSubmit,
    authenticateUser,
    resetLoginStatus,
    authenticateGoogleUser
 } from "../state/slices/loginSlice";
 import { checkAuthStatus, checkAuthUser, selectAuthUser, checkTRM, checkFunds} from "../state/slices/authSlice";


// require("dotenv").config()
const  baseEyeIcon = "fa-solid fa-eye";

export default function Login() {
    const dispatch = useDispatch()
    const [ watchPasswordIcon, setWatchpasswordIcon ] = useState(baseEyeIcon+"-slash")
    const email = useSelector(selectLoginEmail)
    const password = useSelector(selectLoginPassword)
    const disableSubmit = useSelector(selectLoginDisableSubmit)
    const loginStatus = useSelector(selectLoginStatus)
    const authUser = useSelector(selectAuthUser)

    useEffect(() => {
        canSubmit()
    })

    useEffect(()=> {
        dispatch(checkAuthStatus())
        dispatch(checkAuthUser())
        dispatch(checkTRM())
        dispatch(checkFunds()) 
    }, [loginStatus, dispatch, authUser])

    const canSubmit = () => {
        if (email && password){
            dispatch(setDisableSubmit(false))
        }else {
            dispatch(setDisableSubmit(true))
        }
    }

    const handleChange = (event) => {
        const id = event.target.id;
        if (loginStatus) {
            dispatch(resetLoginStatus())
        }
        switch(id){
            case "login-email":
                dispatch(setEmail(event.target.value))
                break;
            default:
                dispatch(setPassword(event.target.value))
                break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(authenticateUser(Object.fromEntries(data)))
    }

    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/api/auth/google`,
            "_self"
        )
    }
    const microsoftAuth = () => {
        window.open(
            `${process.env.REACT_APP_API_URL}/api/auth/microsoft`,
            "_self"
        )
    }
    return (
        <>
            <section id="login-container">
                
                <form onSubmit={handleSubmit} autoComplete="off">
                    <h1>Welcome!</h1>
                    <h2>Login to continue.</h2>
                    {/* <label htmlFor="login-email">E-mail</label> */}
                    <input type="email" name="email" id="login-email" value={email}  onChange={handleChange} placeholder="Email" required></input>
                    {/* <label htmlFor="login-password">Password</label> */}
                    <div id="login-password-container">
                       <input type={watchPasswordIcon === baseEyeIcon ? "text" : "password"} name="password" id="login-password" value={password} onChange={handleChange} placeholder="Password" required ></input><span><i className={watchPasswordIcon} onClick={()=>setWatchpasswordIcon(watchPasswordIcon === baseEyeIcon ? baseEyeIcon+"-slash" : baseEyeIcon)}></i> </span>
                    </div>
                    <Link to="/reset-password">Forgot password?</Link>
                    <p id="incorrect-login-password" style={{visibility: !loginStatus ? "hidden" : "visible", color: "red", fontSize: "0.85rem"}}>{!loginStatus ? "Nothing Here" : loginStatus === 401 ? "Incorrect e-mail or password" : ""}</p>
                    <button type="submit" disabled={disableSubmit}>Log in</button>
                    <div id="login-or">
                        <div></div><p>Or</p><div></div>
                    </div>
                    <div id="login-google-auth-button" className="oauth-button" onClick={googleAuth}>
                        <img src={googleLogo} alt="google logo"></img>
                        <p>Log in with Google</p>
                    </div>
                    <div id="login-microsoft-auth-button" className="oauth-button" onClick={microsoftAuth}>
                        <img src={microsoftLogo} alt="microsoft logo"></img>
                        <p>Log in with Microsoft</p>
                    </div>
                    <p>Dont't have an account yet? <Link to="/signin">Create a new account</Link></p>  
                </form>
                {/* {loginStatus === 200 && authUser && <Navigate to="/profile"/>} */}
                {loginStatus === 200 && authUser && <Navigate to={`/accounts/${authUser.data.id}`}/>}
            </section>
        </>
    )
}