import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: "header",
    initialState: {
        aboutShow: false,
        solutionsShow: false,
        resourcesShow: false
    },
    reducers:{
        toggleAboutShow: (state, action) => {
            state.aboutShow = action.payload
        },
        toggleSolutionsShow: (state, action) => {
            state.solutionsShow = action.payload
        },
        toggleResourcesShow: (state, action) => {
            state.resourcesShow = action.payload
        },
        resetHeaderStates: state => {
            state.aboutShow = false;
        state.solutionsShow = false;
        state.resourcesShow = false;
        }
    }
})

export const selectAboutShow = state => state.header.aboutShow;
export const selectSolutionsShow= state => state.header.solutionsShow;
export const selectResourcesShow = state => state.header.resourcesShow;

export const { 
    toggleAboutShow, 
    toggleResourcesShow, 
    toggleSolutionsShow, 
    resetHeaderStates 
} = headerSlice.actions;

export default headerSlice.reducer;