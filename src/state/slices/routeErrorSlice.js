import { createSlice } from "@reduxjs/toolkit";

const routeErrorSlice = createSlice({
    name: "routeError",
    initialState: {
        error: null
    },
    reducers: {
        setRouteErrror: (state, action) => {
            state.error = action.payload
        }
    }
})

export const selectRouteError = state => state.routeError.error;
export const { setRouteErrror } = routeErrorSlice.actions;
export default routeErrorSlice.reducer