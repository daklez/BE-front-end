import React, {useState} from "react";
import "../style/ForgotPassword.css"
import { Link } from "react-router-dom";
import { requestResetLink } from "../utils";


export default function ForgotPassword() {
    const [verificationEmailStatus, setVerificationEmailStatus] = useState(null)
    const handleSubmit = async(event) => {
        if (verificationEmailStatus){
            setVerificationEmailStatus(null)
        }
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await requestResetLink(Object.fromEntries(data))
        setVerificationEmailStatus(res)
    }
    const handleChange = () => {
        if (verificationEmailStatus){
            setVerificationEmailStatus(null)
        }
    }
    return !verificationEmailStatus  || verificationEmailStatus !== 200 ?(
        <>
            <section id="forgot-password-container">
                <form onSubmit={handleSubmit}>
                    <h1>Forgot your password?</h1>
                    <h2>We'll email you instructions to reset your password.</h2>
                    <input type="text" name="email" placeholder="Email" onChange={handleChange}></input>
                    <Link to="/login">Return to log in</Link>
                    <h2 id="fp-error-message" style={{visibility: verificationEmailStatus ? "visible" : "hidden", color: "red"}}>Verification email sending has failed! Try again</h2>
                    <button>Send instructions</button>
                </form>  
            </section>
            
        </>
    )  : (
        <>
            <section id="verification-email-success"> 
                <h1>Verification email sent successfully!</h1>
                <h2>Please check your email and follow the instructions</h2>
            </section>
        </>
    )
}