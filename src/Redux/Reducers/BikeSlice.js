import { createSlice } from '@reduxjs/toolkit'
import { addNewBike, deletebike, getAllBikes, getSingleBike, updateBikeRating } from '../Actions/BikeAction'


const initialState = {
    loading: false,
    loading2: false,
    error: null,
    deleted: false,
    ratingUpdated: false,
    bikeDetails: [],
    singleBikeData: [],
}

const bikeData = createSlice({
    name: 'bike',
    initialState,
    reducers: {},

    extraReducers: {
        // get all bikes
        [getAllBikes.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllBikes.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bikeDetails = payload
        },
        [getAllBikes.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // get getSingleBike bikes
        [getSingleBike.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getSingleBike.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.singleBikeData = payload
        },
        [getSingleBike.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // delete bike user
        [deletebike.pending]: (state) => {
            state.loading = true
            state.error = null
            state.deleted = false
        },
        [deletebike.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.deleted = true // registration successful
        },
        [deletebike.rejected]: (state, { payload }) => {
            state.loading = false
            state.deleted = false
        },

        // get user details

        [updateBikeRating.pending]: (state) => {
            state.loading2 = true
            state.ratingUpdated = false
        },
        [updateBikeRating.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.ratingUpdated = true
        },
        [updateBikeRating.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.ratingUpdated = false
        },

        //add new bike
        [addNewBike.pending]: (state) => {
            state.loading2 = true
        },
        [addNewBike.fulfilled]: (state, { payload }) => {
            state.loading2 = false
        },
        [addNewBike.rejected]: (state, { payload }) => {
            state.loading2 = false
        },
    },
})

// const BikeData

// export const { } = bikeData.actions

export default bikeData.reducer