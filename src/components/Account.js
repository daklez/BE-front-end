import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo2.png"
import "../style/Profile.css"
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser,
     resetAuthStates, 
     selectAuthUserLoading, 
     checkAuthStatus, 
     checkAuthUser,  
     checkTRM, 
     checkFunds, 
     selectAuthStatus, 
     selectTRM, 
     selectFunds
    } from "../state/slices/authSlice";
import { resetHeaderStates } from "../state/slices/headerSlice";
import { resetLoginStates } from "../state/slices/loginSlice";
import { resetSiginStates } from "../state/slices/signinSlice";
import { requestLogout } from "../utils";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
    selectAccountDepositUserDeposits,
    setAccountDepositDeposits,
    selectAccountDepositDeposits
} from "../state/slices/accountDepositSlice";
import {
    selectAccountWithdrawalUserWithdrawals,
    setAccountWithdrawalWithdrawals,
    selectAccountWithdrawalWithdrawals,
    selectAccountWithdrawalAvailable,
    setAccountWithdrawalAvailable
} from "../state/slices/accountWithdrawalSlice";

//
export default function Account() {
    const location = useLocation()
    const paths = location.pathname.split("/")
    const findActiveSection = () => {
        if (paths.includes("deposit")) {
            return "deposit"
        }
        if (paths.includes("withdraw")) {
            return "withdraw"
        }
        if (paths.includes("transfer")) {
            return "transfer"
        }
        if (paths.includes("investments")) {
            return "investments"  
        }
        if (paths.includes("support")) {
            return "support"
        }
        if (paths.includes("notifications")) {
            return ""
        }
        return "dashboard"
    }
    const [showProfile, setShowProfile] = useState(false)
    const [activeSection, setActiveSection] = useState(findActiveSection())
    const dispatch = useDispatch()
    const user = useSelector(selectAuthUser)
    // const user = {
    //     data: { 
    //         email: "deltaalpha94@hotmail.com",
    //         first_name: "Jose",
    //         id: "0dce86da-2c8b-42f8-8a26-3827b2c3bae0",
    //         last_name: "Akle",
    //         method: "local",
    //         password: "$2b$10$AM2BG9tihBLsENpxtOntqejyMKpw6LYq0R4uBWp",
    //         "contracts": [
    //             {
    //                 "contract_id": "08d85c94-8371-47dc-9771-fcc7e6910377",
    //                 "contract_active_since": null,
    //                 "contract_value": "$ 1.000,00",
    //                 "contract_status": "pending",
    //                 "fund_id": "18851153-1088-467f-954c-c4951d7147c3",
    //                 "fund_name": "Event Driven",
    //                 "fund_monthly_interest": 1,
    //                 "fund_monthly_withdrawals": true,
    //                 "fund_investment_period": "No",
    //                 "fund_minimum_investment": "$ 100,00",
    //                 "withdrawal_deposit_id": "6b56ca07-b4cb-420c-963a-3c86f300349b",
    //                 "withdrawal_deposit_type": "deposit",
    //                 "currency": "USD",
    //                 "exchange_rate": "$ 4.070,88",
    //                 "withdrawal_deposit_date": "2023-09-27T05:00:00.000Z",
    //                 "withdrawal_deposit_effective_date": null,
    //                 "withdrawal_deposit_amount": "$ 1.000,00",
    //                 "withdrawal_deposit_status": "pending"
    //             },
    //             {
    //                 "contract_id": "12d25ef7-db69-41d3-9750-61603f6344d2",
    //                 "contract_active_since": null,
    //                 "contract_value": "$ 2.000,00",
    //                 "contract_status": "pending",
    //                 "fund_id": "de688990-73f6-40be-950c-30a51ddc690d",
    //                 "fund_name": "Macro",
    //                 "fund_monthly_interest": 1.5,
    //                 "fund_monthly_withdrawals": true,
    //                 "fund_investment_period": "No",
    //                 "fund_minimum_investment": "$ 500,00",
    //                 "withdrawal_deposit_id": "d8ad6227-2918-44d2-822d-144fa1e039b7",
    //                 "withdrawal_deposit_type": "deposit",
    //                 "currency": "USD",
    //                 "exchange_rate": "$ 4.070,88",
    //                 "withdrawal_deposit_date": "2023-09-27T05:00:00.000Z",
    //                 "withdrawal_deposit_effective_date": null,
    //                 "withdrawal_deposit_amount": "$ 2.000,00",
    //                 "withdrawal_deposit_status": "pending"
    //             },
    //             {
    //                 "contract_id": "bfc2a81a-e905-493e-8c31-74c12667eb75",
    //                 "contract_active_since": null,
    //                 "contract_value": "$ 1.500,00",
    //                 "contract_status": "pending",
    //                 "fund_id": "2df936d7-e1a4-4c64-bf9c-2a1a36a96a2d",
    //                 "fund_name": "Quantitative",
    //                 "fund_monthly_interest": 2.5,
    //                 "fund_monthly_withdrawals": false,
    //                 "fund_investment_period": "Annual",
    //                 "fund_minimum_investment": "$ 500,00",
    //                 "withdrawal_deposit_id": "73d3bca7-66a8-4c20-9160-e697ca38e6ac",
    //                 "withdrawal_deposit_type": "deposit",
    //                 "currency": "USD",
    //                 "exchange_rate": "$ 4.070,88",
    //                 "withdrawal_deposit_date": "2023-09-27T05:00:00.000Z",
    //                 "withdrawal_deposit_effective_date": null,
    //                 "withdrawal_deposit_amount": "$ 1.500,00",
    //                 "withdrawal_deposit_status": "pending"
    //             },
    //             {
    //                 "contract_id": "f7f8a7ca-60d6-4e7d-bd37-644cf34ebf41",
    //                 "contract_active_since": null,
    //                 "contract_value": "$ 1.200,00",
    //                 "contract_status": "pending",
    //                 "fund_id": "b5009d8f-376b-457b-8b90-96deeb0c3dae",
    //                 "fund_name": "Best Value",
    //                 "fund_monthly_interest": null,
    //                 "fund_monthly_withdrawals": false,
    //                 "fund_investment_period": "Annual",
    //                 "fund_minimum_investment": "$ 1.000,00",
    //                 "withdrawal_deposit_id": "319ab910-339d-4035-8cc8-99716c8c0111",
    //                 "withdrawal_deposit_type": "deposit",
    //                 "currency": "USD",
    //                 "exchange_rate": "$ 4.070,88",
    //                 "withdrawal_deposit_date": "2023-09-27T05:00:00.000Z",
    //                 "withdrawal_deposit_effective_date": null,
    //                 "withdrawal_deposit_amount": "$ 1.200,00",
    //                 "withdrawal_deposit_status": "pending"
    //             },
    //             {
    //                 "contract_id": "17ceb943-7643-43ee-84a8-30ba770d2d27",
    //                 "contract_active_since": null,
    //                 "contract_value": "$ 100,00",
    //                 "contract_status": "pending",
    //                 "fund_id": "60689e22-d7bf-4293-bc98-de493c961af2",
    //                 "fund_name": "Equity Zero",
    //                 "fund_monthly_interest": null,
    //                 "fund_monthly_withdrawals": null,
    //                 "fund_investment_period": null,
    //                 "fund_minimum_investment": "$ 100,00",
    //                 "withdrawal_deposit_id": "62b01d7b-77d7-42a9-a201-9a7899f5d8ce",
    //                 "withdrawal_deposit_type": "deposit",
    //                 "currency": "USD",
    //                 "exchange_rate": "$ 4.070,88",
    //                 "withdrawal_deposit_date": "2023-09-27T05:00:00.000Z",
    //                 "withdrawal_deposit_effective_date": null,
    //                 "withdrawal_deposit_amount": "$ 100,00",
    //                 "withdrawal_deposit_status": "pending"
    //             },
    //             {
    //                 "contract_id": "ea162268-b137-4226-a913-ff496194e7d2",
    //                 "contract_active_since": null,
    //                 "contract_value": "$ 3.000,00",
    //                 "contract_status": "pending",
    //                 "fund_id": "8535b0f8-fb5c-40b8-abc5-1e20ae88efb9",
    //                 "fund_name": "Preferential",
    //                 "fund_monthly_interest": 4,
    //                 "fund_monthly_withdrawals": true,
    //                 "fund_investment_period": "No",
    //                 "fund_minimum_investment": "$ 1.000,00",
    //                 "withdrawal_deposit_id": "95a951bb-b6f8-4561-9947-f32bcb8a4404",
    //                 "withdrawal_deposit_type": "deposit",
    //                 "currency": "USD",
    //                 "exchange_rate": "$ 4.070,88",
    //                 "withdrawal_deposit_date": "2023-09-27T05:00:00.000Z",
    //                 "withdrawal_deposit_effective_date": null,
    //                 "withdrawal_deposit_amount": "$ 3.000,00",
    //                 "withdrawal_deposit_status": "pending"
    //             }
    //         ]
    //         }
    //     }
    const userLoading = useSelector(selectAuthUserLoading)
    const authStatus = useSelector(selectAuthStatus)
    const userDeposits = useSelector(selectAccountDepositUserDeposits)
    const deposits = useSelector(selectAccountDepositDeposits)
    const userWithdrawals = useSelector(selectAccountWithdrawalUserWithdrawals)
    const withdrawals = useSelector(selectAccountWithdrawalWithdrawals)
    const withdrawAvailable = useSelector(selectAccountWithdrawalAvailable)
    const trm = useSelector(selectTRM)
    const funds = useSelector(selectFunds)
    const navigate = useNavigate()

    useEffect(() => {
        setActiveSection(findActiveSection())
        // if(!user && !userLoading) {
        //     navigate("/")
        // }
    }, [location])

    useEffect(() => {
        if (user && deposits === null) {
            dispatch(setAccountDepositDeposits(userDeposits.slice()))
        }
        if (user && withdrawals === null) {
            dispatch(setAccountWithdrawalWithdrawals(userWithdrawals.slice()))
        }
        if (user && withdrawAvailable === null) {
            dispatch(setAccountWithdrawalAvailable(withdrawAvailable.slice()))
        }
        if (!authStatus) {
            dispatch(checkAuthStatus())
        }
        if (!user){
            dispatch(checkAuthUser())
        }
        if (!trm){
            dispatch(checkTRM())
        }
        if (!funds){
            dispatch(checkFunds())
        }
    })

    const handleLogout = async() => {
        await requestLogout()
        dispatch(resetAuthStates())
        dispatch(resetHeaderStates())
        dispatch(resetLoginStates())
        dispatch(resetSiginStates())
        navigate("/")
    }

    if (user) {
        return (
            <> 
            <div id="profile-background"></div>
            <header id="profile-header">
                <Link to="/"><img src={logo} alt="header logo"></img></Link>
                <div id="profile-header-right">
                    <Link to={`/accounts/${user.data.id}/notifications`} ><i className="fa-solid fa-bell"></i></Link>
                    <div id="profile-header-user" onMouseOver={()=>setShowProfile(true)} onMouseOut={()=>setShowProfile(false)}>
                        <i className="fa-solid fa-circle-user" ></i>
                        <ul id="profile-header-right-list" style={{visibility: showProfile ? "visible" : "hidden", opacity: showProfile ? 1 : 0, height: showProfile ? "7rem" : 0}} >
                            <li><Link to={`/accounts/${user.data.id}`} onClick={()=>setShowProfile(false)}><i className="fa-regular fa-id-badge"></i>My account</Link></li> 
                            <li><Link to="/" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Logout</Link></li>
                        </ul>
                    </div>
                </div>  
            </header>
            <aside id="profile-aside">
                { user.data.first_name && <h2><span className="welcome">Welcome</span> {user.data.first_name} {user.data.last_name}</h2>}
                { user.data.name && <h2><span className="welcome">Welcome</span> {user.data.name}</h2>}
                <p id="profile-aside-id">User ID: {user.data.id}</p>
                <section id="profile-aside-links">
                    <Link className={activeSection === "dashboard" ? "active" : ""}to={`/accounts/${user.data.id}`}><i className="fa-solid fa-table-columns"></i>Dashboard</Link>
                    <Link className={activeSection === "deposit" ? "active" : ""} to={`/accounts/${user.data.id}/deposit`}><i className="fa-solid fa-building-columns"></i>Deposit</Link>
                    <Link className={activeSection === "withdraw" ? "active" : ""} to={`/accounts/${user.data.id}/withdraw`}><i className="fa-solid fa-hand-holding-dollar"></i>Withdraw</Link>
                    <Link className={activeSection === "transfer" ? "active" : ""} to={`/accounts/${user.data.id}/transfer`}><i className="fa-solid fa-money-bill-transfer"></i>Transfer</Link>
                    <Link className={activeSection === "investments" ? "active" : ""} to={`/accounts/${user.data.id}/investments`}><i className="fa-solid fa-briefcase"></i>My investments</Link>
                    <Link className={activeSection === "support" ? "active" : ""} to={`/accounts/${user.data.id}/support`}><i className="fa-solid fa-headset"></i>Support</Link>
                </section>
            </aside>
            <main id="profile-main">
                <Outlet context={user}/>
            </main>
        </>
        ) 
    } else {
        if (!userLoading && !user){
            navigate("/") 
        }
        
    }
    
}