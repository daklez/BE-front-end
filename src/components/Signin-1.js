import React, { useEffect } from "react";
import googleLogo from "../assets/images/google-logo.png"
import microsoftLogo from "../assets/images/microsoft-logo.png"
import "../style/Signin.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    selectSigninEmail,
    setEmail,
    selectSigninDisableConfirmEmailSubmit,
    setDisableConfirmEmailSubmit,
    selectSigninConfirmEmailStatus,
    resetSiginStates,
    confirmUserEmail
} from "../state/slices/signinSlice";


export default function Signin1() {
    const dispatch = useDispatch()
    const email = useSelector(selectSigninEmail);
    const disableSubmit = useSelector(selectSigninDisableConfirmEmailSubmit);
    const confirmUserEmailStatus = useSelector(selectSigninConfirmEmailStatus);


    const canSubmit = () => {
        if (email &&/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            dispatch(setDisableConfirmEmailSubmit(false))
            return
        } else {
            dispatch(setDisableConfirmEmailSubmit(true))
            return
            }
        }
    

    
    useEffect(()=> {
        canSubmit()
    }, [email])


    const handleChange = (event) => {
        if (confirmUserEmailStatus) {
            dispatch(resetSiginStates())
        }
        dispatch(setEmail(event.target.value))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(confirmUserEmail(Object.fromEntries(data)))
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

    if (!confirmUserEmailStatus || confirmUserEmailStatus !== 200) {
       return (
        <>  
            <section id="signin-container">
                
                <form onSubmit={handleSubmit} autoComplete="off">
                    <h1>Sign up</h1>
                    <h2>Create your account today!</h2>
                    <input type="email" name="email" id="signin-email" value={email} onChange={handleChange} placeholder="Email" required></input>
                    <p style={{visibility: confirmUserEmailStatus ? "visible" : "hidden", color: "red", fontSize: "0.85rem"}}>{!confirmUserEmailStatus ? "Nothing Here" : confirmUserEmailStatus === 409 ? "Email already in use" : "Something went wrong. Please try again"}</p>
                    <button type="submit" disabled={disableSubmit}>Create account</button>
                    <div id="signin-or">
                        <div></div><p>Or</p><div></div>
                    </div>
                    <div id="signin-google-auth-button" className="oauth-button" onClick={googleAuth}>
                        <img src={googleLogo} alt="google logo"></img>
                        <p>Sign in with Google</p>
                    </div>
                    <div id="login-microsoft-auth-button" className="oauth-button" onClick={microsoftAuth}>
                        <img src={microsoftLogo} alt="microsoft logo"></img>
                        <p>Sign in with Microsoft</p>
                    </div>
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </form>
                
            </section>
            
        </>
        ) 
    } else if (confirmUserEmailStatus === 200) {
        return (
            <>
                <section id="signin-container">
                    <section id="signin-confirm-success">
                        <h1>Success!</h1>
                        <h2>Confirm your email address</h2>
                        <h3>To confirm your email address, please click the link on the email we sent to {email}</h3>
                        <p>If you don't see the email right away, please wait up to 15 minutes and check your spam folder</p>
                        <p>Didn't recieve an email? <Link to="/signin" onClick={()=> dispatch(resetSiginStates())}>Re-enter your email address and try again</Link></p>
                    </section> 
                </section>
                
            </>
        )
    } 
}
