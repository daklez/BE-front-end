import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestAuthUser, requestAuthStatus, requestTRM, requestReadFunds } from "../../utils";

export const checkAuthUser = createAsyncThunk(
    "auth/checkAuthUser", requestAuthUser
)

export const checkAuthStatus = createAsyncThunk(
    "auth/checkAuthStatus", requestAuthStatus
)

export const checkTRM = createAsyncThunk(
    "auth/checkTRM", requestTRM
)

export const checkFunds = createAsyncThunk(
    "auth/checkFunds", requestReadFunds
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authStatusLoading: false,
        status: null,
        authStatusFailed: false,
        authUserLoading: false,
        user: null,
        userContracts: null,
        authUserFailed: false,
        trmLoading: false,
        trm: null,
        trmFailed: false,
        fundsLoading: false,
        funds: null,
        fundsFailed: false,
    },
    reducers: {
        resetAuthStates: state => {
            state.status = null;
            state.user = null;
            state.authUserLoading = false;
            state.authUserFailed = false;
            state.authStatusLoading = false;
            state.authStatusFailed = false;
        }
    },
    extraReducers: {
        [checkAuthUser.pending]: state => {
            state.authUserLoading = true;
            state.authUserFailed = false;
        },
        [checkAuthUser.fulfilled]: (state, action) => {
            state.authUserLoading = false;
            state.authUserFailed = false;
            state.user = action.payload
            state.userContracts = action.payload ? action.payload.data.contracts : []
        },
        [checkAuthUser.rejected]: state => {
            state.authUserLoading = false;
            state.authUserFailed = true;
        },
        [checkAuthStatus.pending]: state => {
            state.authStatusLoading = true;
            state.authStatusFailed = false;
        },
        [checkAuthStatus.fulfilled]: (state, action) => {
            state.authStatusLoading = false;
            state.authStatusFailed = false;
            state.status = action.payload
        },
        [checkAuthStatus.rejected]: state => {
            state.authStatusLoading = false;
            state.authStatusFailed = true;
        },
        [checkTRM.pending]: state => {
            state.trmLoading = true;
            state.trmFailed = false;
        },
        [checkTRM.fulfilled]: (state, action) => {
            state.trmLoading = false;
            state.trmFailed = false;
            state.trm = action.payload
        },
        [checkTRM.rejected]: state => {
            state.trmLoading = false;
            state.trmFailed = true;
        },
        [checkFunds.pending]: state => {
            state.fundsLoading = true;
            state.fundsFailed = false;
        },
        [checkFunds.fulfilled]: (state, action) => {
            state.fundsLoading = false;
            state.fundsFailed = false;
            state.funds = action.payload
        },
        [checkFunds.rejected]: state => {
            state.fundsLoading = false;
            state.fundsFailed = true;
        }
    }
})

export const selectAuthUser = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;
export const selectAuthStatusLoading = state => state.auth.authStatusLoading
export const selectAuthUserLoading = state => state.auth.authUserLoading
export const selectTRM = state => state.auth.trm
export const selectFunds = state => state.auth.funds
export const selectUserContracts = state => state.auth.userContracts

export const { resetAuthStates } = authSlice.actions

export default authSlice.reducer;
//