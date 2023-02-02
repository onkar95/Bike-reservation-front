import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, name, email, Role }, { getState, rejectWithValue }) => {
        try {
            console.log(id)
            const { user } = getState()
            console.log("useraction", user.userInfo.Role)

            if (user.userInfo.Role === "manager") {
                const { data } = await axios.put(`/auth/manager/updateUser/${id}`, { name, email, Role })
                return data
            } else {
                const { data } = await axios.put(`/auth/updateMe/${id}`, { name, email })
                return data
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const updateProfile = createAsyncThunk(
    'user/update',
    async (dataObj, { getState, rejectWithValue }) => {
        try {
            console.log(dataObj)
            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const { data } = await axios.put(`/auth/updateMe/${dataObj.id}`, dataObj.myForm, config)
            return data

        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const getSingleUser = createAsyncThunk(
    'user/getSingelUser',
    async ({ id }, { getState, rejectWithValue }) => {
        try {

            const { data } = await axios.get(`/auth/Singleuser/${id}`)
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const getAllUser = createAsyncThunk(
    'user/all',
    async (args, { getState, rejectWithValue }) => {
        try {

            const { data } = await axios.get(`/auth/manager/users`)
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const deleteUser = createAsyncThunk(
    'user/delete',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            console.log("delete", id)
            const { data } = await axios.delete(`/auth/manager/deleteuser/${id}`)
            return data
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
