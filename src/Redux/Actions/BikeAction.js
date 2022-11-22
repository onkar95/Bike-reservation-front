
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const getAllBikes = createAsyncThunk(
    'bike/details',
    async (arg, { getState, rejectWithValue }) => {
        try {
            // const { user } = getState()

            // const config = {
            //     // headers: {
            //     //     Authorization: `Bearer ${user.userToken}`,
            //     // },
            //     headers: {
            //         'x-access-token': user.userToken,
            //     }
            // }
            const { data } = await axios.get('http://localhost:5000/auth/bikes')
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
    'bike/delete',
    async ({ id }, { getState, rejectWithValue }) => {
        try {

            if (window.confirm("Do you really want to delete") === true) {
                const { data } = axios.delete(`http://localhost:5000/auth/deletebike/${id}`)
                return data;
            }
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
    'bike/rating',
    async ({ rating, bikeID }, { rejectWithValue }) => {
        try {
            const Rating = rating
            const { data } = await axios.put(`http://localhost:5000/auth/updateBike/${bikeID}`, { Rating })
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
    'bike/new',
    async (dataobj, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.post('http://localhost:5000/auth/addBike', dataobj)
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
    'reserv/bike',
    async (obj, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`http://localhost:5000/auth/ReserveBike`, obj)
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
    'getSingleBike/bike',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`http://localhost:5000/auth/Singlebike/${id}`)
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
    'updateBike/bike',
    async ({ id, dataobj }, { getState, rejectWithValue }) => {
        try {
            const { data } = await axios.put(`http://localhost:5000/auth/updateBike/${id}`, dataobj)
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
