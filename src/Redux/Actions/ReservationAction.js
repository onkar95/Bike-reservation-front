import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getAllReservations = createAsyncThunk(
    'bike/Reservations',
    async (args, { rejectWithValue }) => {
        try {

            const { data } = await axios.get('/reserve/manager/reservations')
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)
export const getAllReservationsByUsers = createAsyncThunk(
    'user/Reservations',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/reserve/userReservations/${id}`)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)
export const getAllReservationsOnBikes = createAsyncThunk(
    'bike/Reservations',
    async ({ id }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/reserve/manager/bikeReservations/${id}`)
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message)
            }
        }
    }

)

export const filteredReservations = createAsyncThunk(
    'bike/filterReserv',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            const { AllReservations } = getState()
            // const { data } = await axios.get(`/reserve/reservations?_sort=${"Active"}&_order=dsc`)
            // console.log(data)
            if (AllReservations?.length !== 0) {
                const filter = AllReservations && AllReservations.filter((key) => {
                    return key.BikeId?.toLowerCase().includes(id?.toLowerCase()) || key.UserId?.toLowerCase().includes(id?.toLowerCase())
                })
                return filter
                // setFilteredReservations(filter)
            }
            return AllReservations;

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
export const UpdateAvailability = createAsyncThunk(
    'bike/updateAvail',
    async ({ Availability, BId }, { getState, rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const obj = {
                Availability
            }
            const { data } = await axios.put(`/bike/updateBikeAvailability/${BId}`, obj, config)
            return data;

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
export const cancleReservation = createAsyncThunk(
    'bike/cancelReserv',
    async ({ Active, id }, { rejectWithValue }) => {
        try {

            const obj = {
                Active
            }
            const { data } = await axios.put(`/reserve/updateReservation/${id}`, obj)
            return data;

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

export const updateReservedBikeRating = createAsyncThunk(
    'reserve/rating',
    async ({ rating, Reservationid }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/reserve/updateReservation2/${Reservationid}`, { rating })
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