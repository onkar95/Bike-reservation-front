import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, name, email, Role }, { getState, rejectWithValue }) => {
        try {
            const { user } = getState()
            console.log("useraction", name)
            if (user?.userInfo?.Role === "manager") {
                const { data } = await axios.put(`http://localhost:5000/auth/updateUser/${id}`, { name, email, Role })
                return data
            }
            const { data } = await axios.put(`http://localhost:5000/auth/updateUser/${id}`, { name, email })
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
export const getSingleUser = createAsyncThunk(
    'user/update',
    async ({ id }, { getState, rejectWithValue }) => {
        try {

            const { data } = await axios.get(`http://localhost:5000/auth/Singleuser/${id}`)
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

            const { data } = await axios.get(`http://localhost:5000/auth/users`)
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

            const { data } = await axios.delete(`http://localhost:5000/auth/deleteuser/${id}`)
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