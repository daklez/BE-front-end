import React, {useState, useEffect} from "react";
import "../style/ResetPassword.css"
import { Link } from "react-router-dom";
import { requestResetPassword} from "../utils";
import { useParams } from "react-router-dom";
const  baseEyeIcon = "fa-solid fa-eye";

export default function ResetPassword() {
    const [resetStatus, setResetStatus] = useState(null)
    const [ watchPasswordIcon, setWatchpasswordIcon ] = useState(baseEyeIcon+"-slash")
    const [ password, setPassword ] = useState("")
    const [ disableSubmit, setDisableSubmit ] = useState(true)
    const {resetToken} = useParams()

    useEffect(()=> {
        canSubmit()
    })

    const canSubmit = ()=> {
        if (password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)){
            setDisableSubmit(false)
        } else {
            setDisableSubmit(true)
        }
    }
    const handleSubmit = async(event) => {
        if (resetStatus){
            setResetStatus(null)
        }
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(Object.fromEntries(data))
        const res = await requestResetPassword(Object.fromEntries(data))
        setResetStatus(res)
        
    }
    const handleChange = (event) => {
        if (resetStatus){
            setResetStatus(null)
        }
        setPassword(event.target.value)
    }
    return !resetStatus  || resetStatus !== 200 ?(
        <>
            <section id="reset-password-container">
                <form onSubmit={handleSubmit}>
                    <h1>Reset Password</h1>
                    <h2>Set your new password</h2>
                    <input type="hidden" name="resetToken" value={resetToken.toString()}></input>
                    {/* <input type="text" name="newPassword" placeholder="New password" onChange={handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$" value={password} required></input> */}
                    <div id="reset-password-password-container">
                       <input type={watchPasswordIcon === baseEyeIcon ? "text" : "password"} name="newPassword" id="reset-password" value={password} onChange={handleChange} required autocomplete="off" placeholder="New password"></input><span><i className={watchPasswordIcon} onClick={()=>setWatchpasswordIcon(watchPasswordIcon === baseEyeIcon ? baseEyeIcon+"-slash" : baseEyeIcon)}></i> </span>
                    </div>
                    <p id="reset-password-pattern">At least : 1 Capital letter | 1 Lowercase letter | 1 Number  | 8 character long</p>
                    <h2 style={{visibility: resetStatus ? "visible" : "hidden", color: "red"}}>{resetStatus === 404 || resetStatus === 400 ? (<><h3>Invalid reset link <Link to="/reset-password">Get new link</Link></h3> </>)  : "Password reseting has failed! Try again"}</h2>
                    <button disabled={disableSubmit}>Reset my password</button>
                </form>  
            </section>
            
        </>
    )  : (
        <>
            <section id="reset-password-success"> 
                <h1>Password reset successfull!</h1>
                <Link to="/login">Login</Link>
            </section>
        </>
    )
}