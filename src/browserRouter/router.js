import Root from "../components/Root";
import Home from "../components/Home";
import About from "../components/About";
import Funds from "../components/Funds";
import Contact from "../components/Contact";
import Team from "../components/Team";
import Fund from "../components/Fund";
import Product from "../components/Product";
import Documents from "../components/Documents";
import Faqs from "../components/Faqs";
import Signin2 from "../components/Signin-2";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword"
import ResetPassword from "../components/ResetPassword";
import Profile from "../components/Profile";
import Signin1 from "../components/Signin-1";
import Account from "../components/Account";
import AccountDashboard from "../components/AccountDashboard";
import AccountDeposit from "../components/AccountDeposit";
import AccountInvestments from "../components/AccountInvestments";
import AccountNotifications from "../components/AccountNotifications";
import AccountSupport from "../components/AccountSupport";
import AccountTranfer from "../components/AccountTransfer";
import AccountWithdraw from "../components/AccountWithdraw";
import { createBrowserRouter, createRoutesFromElements, Route, useRouteError, Navigate } from "react-router-dom";
import RouteError from "../components/RouteError";
import { useDispatch } from "react-redux";
import { setRouteErrror } from "../state/slices/routeErrorSlice";

export const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root /> } errorElement={<ErrorBoundary />}>
       <Route path="" element={ <Home /> } />
       <Route path="about" element={ <About /> } />
       <Route path="team" element={ <Team /> } />
       <Route path="contact" element={ <Contact /> } />
       <Route path="funds" element={ <Funds /> } />
       <Route path="funds/:name" element={ <Fund /> } />
       <Route path="products/equityzero" element={ <Product /> } />
       <Route path="documents" element={ <Documents /> } />
       <Route path="faqs" element={ <Faqs /> } />
       <Route path="signin" element={ <Signin1 /> } />
       <Route path="signin/:signinToken" element={ <Signin2 /> } />
       <Route path="login" element={ <Login /> } />
       <Route path="reset-password" element={ <ForgotPassword /> } />
       <Route path="reset-password/:resetToken" element={ <ResetPassword /> } />
       <Route path="profile" element={ <Profile /> } />
       <Route path="accounts/:userId/" element={ <Account /> } >
          <Route path="" element={ <AccountDashboard /> } />
          <Route path="deposit" element={ <AccountDeposit /> } />
          <Route path="investments" element={ <AccountInvestments /> } />
          <Route path="notifications" element={ <AccountNotifications /> } />
          <Route path="support" element={ <AccountSupport /> } />
          <Route path="transfer" element={ <AccountTranfer /> } />
          <Route path="withdraw" element={ <AccountWithdraw /> } />
       </Route>
       <Route path="notfound" element={ <RouteError /> } />
    </Route>
))

function ErrorBoundary() {
    let error = useRouteError();
    console.error(error);
    const dispatch = useDispatch()
    dispatch(setRouteErrror(error))
    // Uncaught ReferenceError: path is not defined
    return <Navigate to="/notfound" />;
  }