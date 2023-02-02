import { createSlice } from '@reduxjs/toolkit'
import { verifyUser, registerUser, userLogin, Userlogout } from '../Actions/AuthActions'
import { deleteUser, getAllUser, getSingleUser, updateProfile, updateUser } from '../Actions/UserAction'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

let verified
const initialState = {
    loading: false,
    userInfo: [],
    singleUserInfo: [],
    AllUser: [],
    userToken,
    error: null,
    success: false,
    userUpdated: false,
    userDeleted: false,
    userCreated: false,
    verified
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = []
            state.userToken = null
            state.error = null
            state.verified = false
        },
        clearErrors: (state) => {
            state.error = null
        },
        resetUserVariables: (state) => {
            if (state.userUpdated) state.userUpdated = false
            if (state.userDeleted) state.userDeleted = false
            if (state.userCreated) state.userCreated = false
        }

    },

    extraReducers: {
        // login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload.user
            state.userToken = payload.token
            state.verified = true
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.userCreated = false
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userCreated = true
            state.verified = true
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.userCreated = false
        },

        // get user details
        [verifyUser.pending]: (state) => {
            state.loading = true
            // state.verified = false
        },
        [verifyUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.verified = true
            state.userInfo = payload.user

        },
        [verifyUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.verified = false
            state.userInfo = []
        },

        //update profile
        [updateProfile.pending]: (state) => {
            state.loading = true
            state.userUpdated = false
        },
        [updateProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userUpdated = true
            state.singleUserInfo = payload
        },
        [updateProfile.rejected]: (state, { payload }) => {
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
            state.userDeleted = false
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userDeleted = true
        },
        [deleteUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.userDeleted = false
        },

        //Userlogout user
        [Userlogout.pending]: (state) => {
            state.loading = true
        },
        [Userlogout.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.verified = false
        },
        [Userlogout.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },


    },
})

// const BikeData

export const { logout, addToken, clearErrors, resetUserVariables } = userSlice.actions

export default userSlice.reducer