import axios from "axios"
import { createAsyncThunk } from '@reduxjs/toolkit'


export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.post(
                '/auth/login',
                { email, password },
                config
            )
            return data
        } catch (error) {
            console.log(error)
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ name, email, password, Role, Avatar }, { rejectWithValue }) => {
        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };


            const { data } = await axios.post(
                '/auth/register',
                { name, email, password, Role, Avatar },
                config
            )
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const Userlogout = createAsyncThunk(
    'user/logout',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const data = getState()
            console.log(data)
            await axios.get('/auth/logout');

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const verifyUser = createAsyncThunk(
    'user/verifyUser',
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/auth/verifyuser`)

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