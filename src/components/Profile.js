import React, { useState } from "react";
import logo from "../assets/images/logo2.png"
import "../style/Profile.css"
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser, resetAuthStates, selectAuthUserLoading} from "../state/slices/authSlice";
import { resetHeaderStates } from "../state/slices/headerSlice";
import { resetLoginStates } from "../state/slices/loginSlice";
import { resetSiginStates } from "../state/slices/signinSlice";
import { requestLogout } from "../utils";
import { useNavigate, Outlet, Link } from "react-router-dom";


export default function Profile() {
    const [showProfile, setShowProfile] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(selectAuthUser)
    const userLoading = useSelector(selectAuthUserLoading)
    const navigate = useNavigate()
    console.log(user, 'user')
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
            <div id="profile-background">

            </div>
            <header id="profile-header">
                <Link to="/"><img src={logo} alt="header logo"></img></Link>
                <div id="profile-header-right" onMouseOver={()=>setShowProfile(true)} onMouseOut={()=>setShowProfile(false)}>
                    <i class="fa-solid fa-circle-user"></i>
                    <ul id="profile-header-right-list" style={{visibility: showProfile ? "visible" : "hidden"}} >
                        <li><Link to="/profile" onClick={()=>setShowProfile(false)}><i class="fa-regular fa-id-badge"></i>Your profile</Link></li> 
                        <li><Link to="/" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Logout</Link></li>
                    </ul>
                </div>
                
            </header>
            <aside id="profile-aside">
                <h2>Welcome Jose Akle</h2>
                <ul>
                    <li><Link to="/"><i class="fa-solid fa-table-columns"></i>Dashboard</Link></li>
                    <li><Link to="/"><i class="fa-solid fa-building-columns"></i>Deposit</Link></li>
                    <li><Link to="/"><i class="fa-solid fa-hand-holding-dollar"></i>Withdraw</Link></li>
                    <li><Link to="/"><i class="fa-solid fa-money-bill-transfer"></i>Transfer</Link></li>
                    <li><Link to="/"><i class="fa-solid fa-briefcase"></i>My investments</Link></li>
                    <li><Link to="/"><i class="fa-solid fa-bell"></i>Notifications</Link></li>
                    <li><Link to="/"><i class="fa-solid fa-headset"></i>Support</Link></li>
                </ul>
            </aside>
            <main id="profile-main">
                <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia orci quis augue sagittis tempor. Etiam luctus congue eros, vel dapibus quam commodo at. Nunc mattis tellus a elit tempus fermentum. In efficitur pretium est, sed facilisis mauris auctor eu. Proin pulvinar faucibus dui, ut dapibus nulla rutrum ac. In a molestie mauris, auctor sodales dolor. Mauris et tincidunt nibh. Donec laoreet cursus quam, quis pellentesque odio pretium at. Morbi consequat, justo eu condimentum congue, ex magna rhoncus urna, tempor vehicula purus libero sed nisi. Praesent iaculis nulla at metus suscipit, eu sodales turpis ullamcorper.

Proin viverra tortor sit amet metus molestie, id finibus nulla consequat. Nulla pharetra malesuada metus, in efficitur metus mollis et. Duis auctor eros sit amet ante accumsan consectetur. In tristique sed arcu et posuere. Praesent dignissim ut risus sit amet fringilla. Vestibulum quis felis in sapien rutrum viverra vitae tincidunt purus. Cras purus ante, dignissim a accumsan vitae, gravida vitae turpis. Maecenas aliquet nulla ac nibh rutrum efficitur. In vestibulum felis non sapien pretium, non pulvinar velit egestas. Nulla id magna ipsum. Proin massa tellus, iaculis id molestie a, eleifend eu est. Quisque lobortis, metus at mattis cursus, nulla nunc accumsan mauris, vel pellentesque metus sem sagittis justo. Praesent venenatis augue felis, vel ultrices nisl pulvinar sit amet.

Maecenas mattis at nisi eget dictum. Donec rutrum, ipsum id lacinia viverra, nunc enim ullamcorper urna, in dictum odio elit quis augue. Duis tincidunt, massa eu viverra tempor, enim neque vestibulum turpis, vitae sodales eros metus a erat. Aenean laoreet turpis congue, consequat lectus eget, rutrum augue. Vivamus et mattis mauris, quis molestie est. Nunc auctor, augue quis varius convallis, massa lorem mattis metus, et laoreet sem risus eu turpis. Proin at est a risus accumsan ultrices. Morbi id tempor erat, quis tempor dui. Morbi pharetra dictum consequat. Aliquam scelerisque sem nisl, in faucibus lorem aliquam sit amet. Etiam dictum risus et tortor interdum finibus. Quisque dui sem, tempor nec commodo ac, pharetra sed nulla.

Suspendisse potenti. Sed suscipit enim sed mauris dapibus posuere. Morbi libero sem, commodo in molestie sit amet, molestie quis arcu. Praesent at nulla at nisi pretium condimentum et ut libero. Pellentesque tellus neque, luctus condimentum nibh vel, euismod scelerisque ligula. Maecenas eget blandit enim. Nunc eleifend risus at ex malesuada, vitae pretium dui varius. Aliquam tellus leo, dignissim vel pretium sit amet, porttitor et augue. Donec non consequat nulla. Vivamus commodo quam sit amet risus tempus, sit amet scelerisque purus consequat. Nulla condimentum metus pretium, congue arcu non, dapibus leo. Pellentesque non sem sed justo tincidunt fermentum. Nulla tempor ligula a nisi vehicula vulputate. Cras vitae turpis diam. Etiam semper eget urna non suscipit. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Nullam in augue rhoncus, venenatis mauris eu, maximus risus. Nam mi metus, dapibus vitae ornare vel, sodales varius tortor. Praesent quis ultrices sapien. Fusce ultricies vulputate congue. Donec efficitur lorem ultrices molestie auctor. Maecenas suscipit vehicula dui quis placerat. Vestibulum rhoncus quis urna in condimentum. Curabitur a cursus lacus. Sed sed malesuada magna, vel finibus leo. Morbi imperdiet euismod elit vitae gravida.

Proin ut libero eu magna porta mattis ultricies et lorem. Ut mollis ipsum justo, ullamcorper viverra eros congue et. Pellentesque rutrum accumsan dui, sed lobortis odio. Suspendisse vitae nibh metus. Nam malesuada enim quam, fringilla mollis urna posuere a. Nullam non purus nunc. Praesent porttitor porttitor risus. Integer porttitor tortor mauris, in eleifend lectus sodales sit amet. Nunc eu pretium lacus. Duis sit amet erat in purus eleifend consectetur sit amet pellentesque justo. Proin fringilla ligula urna, ullamcorper volutpat arcu rutrum a. Morbi placerat ornare luctus.

Donec condimentum, risus sed imperdiet pharetra, lacus augue vestibulum libero, quis auctor odio sapien venenatis arcu. Vestibulum eget purus ut ipsum ullamcorper efficitur. Phasellus posuere leo in nisl ullamcorper gravida. Pellentesque mollis arcu in dui convallis mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus. In non metus quam. Etiam facilisis libero non est mollis, ac aliquet elit sollicitudin. Duis ultrices volutpat ligula, sit amet accumsan diam. Nam ut feugiat ipsum, quis bibendum sem.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque tempor ac enim at pretium. Nullam scelerisque facilisis egestas. Duis sit amet pretium enim. Suspendisse mollis enim a varius facilisis. In hac habitasse platea dictumst. Phasellus sit amet tellus feugiat leo vulputate semper vitae vitae sapien. Integer porta nisi vel orci aliquam, quis rhoncus lorem porttitor. Proin quis sapien convallis, ultrices magna vitae, finibus ligula. Nulla facilisi. Nulla quis nibh at mi commodo aliquet eu a purus. Nam dapibus est lectus, vitae pellentesque leo pulvinar consequat. Vivamus nec tellus sem. Nulla dapibus odio metus, nec posuere lacus dignissim sit amet. Proin ultricies enim leo.

Vestibulum quis nibh ut enim tristique tristique in sed leo. Morbi congue purus laoreet nulla sollicitudin sagittis. Aenean non ligula vitae nibh suscipit suscipit at in est. Morbi aliquet pretium tempor. In vitae augue ut orci vulputate imperdiet. Duis scelerisque erat vestibulum, mollis quam ac, ultricies ligula. Etiam ut euismod nibh. Sed lectus lectus, sagittis sed ipsum id, tincidunt sagittis mauris. Praesent eget odio iaculis, mattis leo vitae, semper lacus. Donec et lectus lectus.

Fusce at neque a justo scelerisque finibus. Sed erat risus, consectetur et purus sit amet, bibendum vehicula metus. Nam malesuada posuere viverra. Nunc ut condimentum enim. Nulla facilisi. Vestibulum posuere consectetur leo nec dictum. Pellentesque eros nunc, pharetra molestie laoreet non, convallis sed turpis.`}</p>
            </main>
            <button onClick={handleLogout}>Logout</button>
            
        </>
    ) 

    // if (user) {
    //     return (
    //         <>  
    //             <header id="profile-header">
    //                 <Link to="/"><img src={logo} alt="header logo"></img></Link>
    //             </header>
    //             <aside id="profile-aside">
    //                 { user.data.first_name && <h1>Welcome {user.data.first_name} {user.data.last_name}</h1>}
    //                 { user.data.name && <h1>Welcome {user.data.name}</h1>}
    //             </aside>
    //             <main id="profile-main">
    //                 <Outlet />
    //             </main>
    //             <button onClick={handleLogout}>Logout</button>
                
    //         </>
    //     ) 
    // } else {
    //     if (!userLoading && !user){
    //         navigate("/") 
    //     }
        
    // }
    
}