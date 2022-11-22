import { createSlice } from '@reduxjs/toolkit'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: [],
    userToken,
    error: {},
    success: false,
}



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logutReducer: (state) => {
            state.userInfo = [];
        },
        loginStart: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            state.userInfo = action.payload;
        },
        loginFailure: (state, action) => {
            state.pending = false;
            state.error = action.payload.response.data;
        },
    },
});

export const { logutReducer, loginStart, loginSuccess, loginFailure } = userSlice.actions

export default userSlice.reducer