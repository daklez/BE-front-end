import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import signinSlice from './slices/signinSlice';
import loginSlice from './slices/loginSlice';
import authSlice from './slices/authSlice';
import routeErrorSlice from "./slices/routeErrorSlice";
import accountDepositSlice from './slices/accountDepositSlice';
import accountWithdrawalSlice from './slices/accountWithdrawalSlice';


export const store = configureStore({
    reducer: {
        header: headerSlice,
        signin: signinSlice,
        login: loginSlice,
        auth: authSlice,
        routeError: routeErrorSlice,
        accountDeposit: accountDepositSlice,
        accountWithdrawal: accountWithdrawalSlice
    }
})
