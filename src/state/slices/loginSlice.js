import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestLogin, requestGoogleAuth } from "../../utils";

export const authenticateUser = createAsyncThunk(
    "login/authenticateUser", requestLogin
)

export const authenticateGoogleUser = createAsyncThunk(
    "login/authenticateGoogleUser", requestGoogleAuth
)

const loginSlice = createSlice({
    name: "login",
    initialState: {
        email: "",
        password: "",
        disableSubmit: true,
        loginStatus: null,
        loginStatusLoading: false,
        loginStatusFailed: false
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setDisableSubmit: (state, action) => {
            state.disableSubmit = action.payload;
        },
        resetLoginStates: state => {
            state.email = "";
            state.password = "";
            state.disableSubmit = true;
            state.loginStatus = null;
            state.loginStatusLoading = false;
            state.loginStatusFailed = false;
        },
        resetLoginStatus: state => {
            state.loginStatus = null;
            state.loginStatusLoading = false;
            state.loginStatusFailed = false;
        }
    },
    extraReducers: {
        [authenticateUser.pending]: state => {
            state.loginStatusLoading = true;
            state.loginStatusFailed = false;
        },
        [authenticateUser.fulfilled]: (state, action) => {
            state.loginStatusLoading = false;
            state.loginStatusFailed = false;
            state.loginStatus = action.payload
        },
        [authenticateUser.rejected]: state => {
            state.loginStatusLoading = false;
            state.loginStatusFailed = true;
        },
        [authenticateGoogleUser.pending]: state => {
            state.loginStatusLoading = true;
            state.loginStatusFailed = false;
        },
        [authenticateGoogleUser.fulfilled]: (state, action) => {
            state.loginStatusLoading = false;
            state.loginStatusFailed = false;
            state.loginStatus = action.payload
        },
        [authenticateGoogleUser.rejected]: state => {
            state.loginStatusLoading = false;
            state.loginStatusFailed = true;
        }
    }
})

export const selectLoginEmail = state => state.login.email;
export const selectLoginPassword = state => state.login.password;
export const selectLoginDisableSubmit = state => state.login.disableSubmit;
export const selectLoginStatus = state => state.login.loginStatus;
export const selectLoginStatusLoading = state => state.login.loginStatusLoading

export const {
    setEmail,
    setPassword,
    setDisableSubmit,
    resetLoginStates,
    resetLoginStatus
} = loginSlice.actions;

export default loginSlice.reducer