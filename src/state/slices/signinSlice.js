import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestRegister, requestConfirmEmail } from "../../utils";

export const confirmUserEmail = createAsyncThunk(
    "signin/confirmUserEmail", requestConfirmEmail
)

export const registerUser = createAsyncThunk(
    "signin/registerUser", requestRegister
)

const signinSlice = createSlice({
    name: "signin",
    initialState: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        disableConfirmEmailSubmit: true,
        disableSubmit: true,
        confirmEmailStatus: null,
        confirmEmailLoading: false,
        confirmEmailFailed: false,
        registerStatus: null,
        registerLoading: false,
        registerFailed: false
    },
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setDisableConfirmEmailSubmit: (state, action) => {
            state.disableConfirmEmailSubmit = action.payload;
        },
        setDisableSubmit: (state, action) => {
            state.disableSubmit = action.payload;
        },
        resetSiginStates: state => {
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.password = "";
            state.disableSubmit = true;
            state.registerStatus = null;
            state.registerLoading = false;
            state.registerFailed = false;
            state.confirmEmailStatus = null;
            state.confirmEmailLoading = false;
            state.confirmEmailFailed = false;
        }
    },
    extraReducers: {
        [confirmUserEmail.pending]: state => {
            state.confirmEmailLoading = true;
            state.confirmEmailFailed = false;
        },
        [confirmUserEmail.fulfilled]: (state, action) => {
            state.confirmEmailLoading = false;
            state.confirmEmailFailed = false;
            state.confirmEmailStatus = action.payload;
        },
        [confirmUserEmail.rejected]: state => {
            state.confirmEmailLoading = false
            state.confirmEmailFailed = true;
        },
        [registerUser.pending]: state => {
            state.registerLoading = true;
            state.registerFailed = false;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.registerLoading = false;
            state.registerFailed = false;
            state.registerStatus = action.payload;
        },
        [registerUser.rejected]: state => {
            state.registerLoading = false
            state.registerFailed = true;
        }
    }
})

export const selectSigninFirstName = state => state.signin.firstName;
export const selectSigninLastname = state => state.signin.lastName;
export const selectSigninEmail = state => state.signin.email;
export const selectSigninPassword = state => state.signin.password;
export const selectSigninDisableConfirmEmailSubmit = state => state.signin.disableConfirmEmailSubmit;
export const selectSigninDisableSubmit = state => state.signin.disableSubmit;
export const selectSigninConfirmEmailStatus = state => state.signin.confirmEmailStatus;
export const selectSigninRegisterStatus = state => state.signin.registerStatus;

export const { 
    setFirstName, 
    setLastName, 
    setEmail, 
    setPassword, 
    setConfirmPassword,
    setDisableConfirmEmailSubmit, 
    setDisableSubmit, 
    resetSiginStates 
} = signinSlice.actions;

export default signinSlice.reducer;