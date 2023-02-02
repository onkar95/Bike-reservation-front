
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const getAllBikes = createAsyncThunk(
    'bike/getAllBikes',
    async (arg, { getState, rejectWithValue }) => {
        try {

            const { data } = await axios.get('/bike/bikes')
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
export const deletebike = createAsyncThunk(
    'bike/deletebike',
    async ({ id }, { getState, rejectWithValue }) => {
        try {

            const { data } = axios.delete(`/bike/manager/deletebike/${id}`)

            return data;

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

export const updateBikeRating = createAsyncThunk(
    'bike/updateBikeRating',
    async ({ rating, comment, bikeID, userID }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/bike/RatingForBike/${bikeID}`, { rating, comment, bikeID, userID })
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

export const addNewBike = createAsyncThunk(
    'bike/addNewBike',
    async (dataobj, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.post('/bike/addBike', dataobj)
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
export const reserveBike = createAsyncThunk(
    'bike/reserveBike',
    async (obj, { getState, rejectWithValue }) => {
        try {
            console.log(obj)
            const { data } = await axios.post(`/reserve/ReserveBike`, obj)
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
export const getSingleBike = createAsyncThunk(
    'bike/getSingleBike',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/bike/Singlebike/${id}`)
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
export const updateBike = createAsyncThunk(
    'bike/updateBike',
    async ({ id, dataobj }, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/bike/manager/updateBike/${id}`, dataobj)
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
