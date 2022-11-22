import { createSlice } from '@reduxjs/toolkit'
import { getUserDetails, registerUser, userLogin } from '../Actions/AuthActions'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../Actions/UserAction'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: [],
    singleUserInfo: [],
    AllUser: [],
    userToken,
    error: null,
    success: false,
    userUpdated: false,
    userDeleted: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken') // delete token from storage
            state.loading = false
            state.userInfo = []
            state.userToken = null
            state.error = null
        },

    },

    extraReducers: {
        // login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.token
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // get user details
        [getUserDetails.pending]: (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
        },
        [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false
        },

        //updateuser
        [updateUser.pending]: (state) => {
            state.loading = true
            state.userUpdated = false
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userUpdated = true
            // state.userInfo = payload
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.userUpdated = false
        },

        //get user
        [getSingleUser.pending]: (state) => {
            state.loading = true
        },
        [getSingleUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.singleUserInfo = payload
        },
        [getSingleUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        //get all user
        [getAllUser.pending]: (state) => {
            state.loading = true
        },
        [getAllUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AllUser = payload
        },
        [getAllUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        //delete user
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userDeleted = true
        },
        [deleteUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    },
})

// const BikeData

export const { logout } = userSlice.actions

export default userSlice.reducer