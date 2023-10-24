import React, { useEffect } from "react";
import video from "../assets/videos/background-video.mp4";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation} from "react-router-dom";
import { resetLoginStates, selectLoginEmail, selectLoginPassword } from "../state/slices/loginSlice";
import { resetSiginStates, selectSigninFirstName, selectSigninLastname, selectSigninEmail, selectSigninPassword } from "../state/slices/signinSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, checkAuthUser} from "../state/slices/authSlice";


export default function Root() {
    const location = useLocation()
    const dispatch = useDispatch()
    const loginEmail = useSelector(selectLoginEmail);
    const loginPassword = useSelector(selectLoginPassword);
    const firstName = useSelector(selectSigninFirstName)
    const lastName = useSelector(selectSigninLastname)
    const signinEmail = useSelector(selectSigninEmail)
    const signinPassword = useSelector(selectSigninPassword)

    useEffect(() => {
        window.scrollTo(0, 0)
        if (loginEmail || loginPassword){
            dispatch(resetLoginStates())
        }
        if (firstName || lastName || signinEmail || signinPassword) {
            dispatch(resetSiginStates())
        }
        dispatch(checkAuthUser())
        dispatch(checkAuthStatus())
    }, [location])

    // useEffect(()=>{
    //     dispatch(checkAuthUser())
    //     dispatch(checkAuthStatus())
    // }, [])

    // 



if (!(/\/accounts\//.test(location.pathname))){
    return (
        <>
        {/* <video autoplay muted loop id="bg-video">
                    <source src={video} type="video/mp4"/>
                </video> */}
            <header id="header">
                <Header />
            </header>
            <main id="main">
                
                <Outlet />
            </main>
            <footer>
               <Footer /> 
            </footer>
        </>
    )
} else {
    return (
        <>
            <main id="main">
                <Outlet />
            </main>
        </>
    )
}
    
}