import React, {useState } from "react";
import logo from "../assets/images/logo2.png"
import { NavLink, Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetHeaderStates } from "../state/slices/headerSlice";
import { resetLoginStates } from "../state/slices/loginSlice";
import { resetSiginStates } from "../state/slices/signinSlice";
import { requestLogout } from "../utils";
import { selectAuthUser, resetAuthStates} from "../state/slices/authSlice";


export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showProfile, setShowProfile] = useState(false)
    const [aboutShowState, setAboutShowState] = useState(false)
    const [solutionsShowState, setSolutionsShowState] = useState(false)
    const [resourcesShowState, setResourcesShowState] = useState(false)

    const authUser = useSelector(selectAuthUser)
    const aboutDropDownStyle = {visibility: aboutShowState ? "visible" : "hidden", opacity: aboutShowState ? 1 : 0, height: aboutShowState ? "10rem" : 0, fontSize: aboutShowState ? "1.1rem" : 0}
    const solutionsDropDownStyle = { visibility: solutionsShowState ? "visible" : "hidden", opacity: solutionsShowState ? 1 : 0, height: solutionsShowState ? "10rem" : 0, fontSize: solutionsShowState ? "1.1rem" : 0}
    const resourcesDropDownStyle = { visibility: resourcesShowState ? "visible" : "hidden", opacity: resourcesShowState ? 1 : 0, height: resourcesShowState ? "10rem" : 0, fontSize: resourcesShowState ? "1.1rem" : 0}
    const handleLogout = async() => {
        await requestLogout()
        dispatch(resetAuthStates())
        dispatch(resetHeaderStates())
        dispatch(resetLoginStates())
        dispatch(resetSiginStates())
        navigate("/")
    }
    return (

        <>
            <div id="header-nav">
                <Link to="/"><img src={logo} alt="header logo"></img></Link>
                
                <div id="header-about" className="drop-down" onMouseOver={()=>setAboutShowState(true)} onMouseOut={()=>setAboutShowState(false)}>
                    <p style={{textDecoration : aboutShowState ? "underline" : "none"}}>About us<i className="fa-solid fa-angle-down"></i></p>
                    <div style={aboutDropDownStyle} className="hidden-extension">
                        <div>
                            <p style={{visibility: "hidden"}}>XXXXXX</p> 
                            <NavLink style={{visibility: "hidden"}} to="/about" >XXXXXXXX</NavLink>
                            <NavLink style={{visibility: "hidden"}} to="/team" >XXXXXX</NavLink>
                        </div>
                        <div>
                            <p style={{visibility: "hidden"}}>XXXXXXX</p> 
                            <NavLink style={{visibility: "hidden"}} to="/contact" >XXXXXXXXXX</NavLink>
                        </div>
                    </div>
                    <div style={aboutDropDownStyle} className="drop-down-hidden" >
                        <div className="drop-down-right-border">
                            <p style={{visibility: aboutShowState ? "visible" : "hidden", opacity: aboutShowState ? 1 : 0, fontSize: aboutShowState ? "1.1rem" : 0}}>OUR COMPANY</p> 
                            <NavLink to="/about" onClick={()=>setAboutShowState(false)}>About Breakeven</NavLink>
                            <NavLink to="/team" onClick={()=>setAboutShowState(false)}>Our team</NavLink>
                        </div>
                        <div className="drop-down-left-border">
                            <p style={{visibility: aboutShowState ? "visible" : "hidden", opacity: aboutShowState ? 1 : 0, fontSize: aboutShowState ? "1.1rem" : 0}}>CONNECT WITH US</p> 
                            <NavLink to="/contact" onClick={()=>setAboutShowState(false)}>Customer Service</NavLink>
                        </div>
                    </div>
                </div>
                
                <div id="header-solutions" className="drop-down" onMouseOver={()=>setSolutionsShowState(true)} onMouseOut={()=>setSolutionsShowState(false)}>
                    <p style={{textDecoration : solutionsShowState ? "underline" : "none"}}>Solutions<i className="fa-solid fa-angle-down"></i></p>
                    <div style={solutionsDropDownStyle} className="hidden-extension" >
                        <div >
                            <p style={{visibility: "hidden"}}>XXXXXX</p> 
                            <NavLink style={{visibility: "hidden"}} to="/funds">XXXXXX</NavLink>
                        </div>
                        <div >
                            <p style={{visibility: "hidden"}}>XXXXXX</p> 
                            <NavLink style={{visibility: "hidden"}} to="products/equityzero">XXXXX</NavLink>
                        </div>
                    </div>
                    <div style={solutionsDropDownStyle} className="drop-down-hidden" >
                        <div className="drop-down-right-border">
                            <p style={{visibility: solutionsShowState ? "visible" : "hidden", opacity: solutionsShowState ? 1 : 0, fontSize: solutionsShowState ? "1.1rem" : 0}}>FUNDS</p> 
                            <NavLink to="/funds" onClick={()=>setSolutionsShowState(false)}>Our Funds</NavLink>
                        </div>
                        <div className="drop-down-left-border">
                            <p style={{visibility: solutionsShowState ? "visible" : "hidden", opacity: solutionsShowState ? 1 : 0, fontSize: solutionsShowState ? "1.1rem" : 0}}>PRODUCTS</p> 
                            <NavLink to="products/equityzero" onClick={()=>setSolutionsShowState(false)}>Equity Zero</NavLink>
                        </div>
                    </div>
                </div>

                <div id="header-resources" className="drop-down" onMouseOver={()=>setResourcesShowState(true)} onMouseOut={()=>setResourcesShowState(false)}>
                    <p style={{textDecoration : resourcesShowState ? "underline" : "none"}}>Resources<i className="fa-solid fa-angle-down"></i></p>
                    <div style={resourcesDropDownStyle} className="hidden-extension" >
                        <div>
                            <p style={{visibility: "hidden"}}>XXXXX</p> 
                            <NavLink style={{visibility: "hidden"}} to="/documents" >XXXX</NavLink>
                            <NavLink style={{visibility: "hidden"}} to="/blog" >XXXX</NavLink>
                            <NavLink style={{visibility: "hidden"}} to="/faqs" >XXX</NavLink>
                        </div>
                    </div>
                    <div style={resourcesDropDownStyle} className="drop-down-hidden" >
                        <div>
                            <p style={{visibility: resourcesShowState ? "visible" : "hidden", opacity: resourcesShowState ? 1 : 0, fontSize: resourcesShowState ? "1.1rem" : 0}}>RESOURCES</p> 
                            <NavLink to="/documents" onClick={()=>setResourcesShowState(false)}>Documents</NavLink>
                            <NavLink to="/blog" onClick={()=>setResourcesShowState(false)}>Blog</NavLink>
                            <NavLink to="/faqs" onClick={()=>setResourcesShowState(false)}>FAQs</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="header-login-signin">
                {!authUser && <NavLink id="signin-link" to="/signin">Sign Up</NavLink>}
                {!authUser && <NavLink id="login-link" to="/login">Log In</NavLink>}
            </div>
            
            {authUser && (
                <div id="profile-header-user" onMouseOver={()=>setShowProfile(true)} onMouseOut={()=>setShowProfile(false)}>
                    <i className="fa-solid fa-circle-user"></i>
                    <ul id="profile-header-right-list" style={{visibility: showProfile ? "visible" : "hidden", opacity: showProfile ? 1 : 0, height: showProfile ? "7rem" : 0}} >
                        <li><Link to={`/accounts/${authUser.data.id}`} onClick={()=>setShowProfile(false)}><i className="fa-regular fa-id-badge"></i>My account</Link></li> 
                        <li><Link to="/" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</Link></li>
                    </ul>
                </div>
                )
            }
            {/* {!authUser && <NavLink  to="/signin">Sign In</NavLink>}
            {!authUser && <NavLink  to="/login">Login</NavLink>} */}
        </>
    )
}
//