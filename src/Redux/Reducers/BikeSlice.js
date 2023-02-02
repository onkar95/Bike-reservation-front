import { createSlice } from '@reduxjs/toolkit'
import { Userlogout } from '../Actions/AuthActions'
import { addNewBike, deletebike, getAllBikes, getSingleBike, reserveBike, updateBikeRating, updateBike } from '../Actions/BikeAction'
import { filterBikes, SearchBike } from '../Actions/FilterSearchAction'
import { UpdateAvailability } from '../Actions/ReservationAction'


const initialState = {
    AllBikes: [],
    singleBikeData: [],
    filteredBikeData: [],
    loading: false,
    loading2: false,
    error: null,

    filtered: false,
    AllBikesFetched: false,
    Bikedeleted: false,
    ratingUpdated: false,
    bikeDetailsUpdated: false,
    updateBikeAvil: false,
    newBikeAdded: false,
    bikeReserved: false,
}

const bikeData = createSlice({
    name: 'bike',
    initialState,
    reducers: {
        resetBikeVariables: (state) => {
            if (state.Bikedeleted) state.Bikedeleted = false
            if (state.ratingUpdated) state.ratingUpdated = false
            if (state.bikeDetailsUpdated) state.bikeDetailsUpdated = false
            if (state.updateBikeAvil) state.updateBikeAvil = false
            if (state.newBikeAdded) state.newBikeAdded = false
            if (state.bikeReserved) state.bikeReserved = false
            // if (state.bikeReserved) state.error = null
            // setTimeout(() => {
            // }, 1000)
        }
    },

    extraReducers: {

        // logout user
        [Userlogout.pending]: (state) => {
            state.loading = true
        },
        [Userlogout.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AllBikesFetched = false
            state.ReservationsFetched = false
        },
        [Userlogout.rejected]: (state, { payload }) => {
            state.loading = false
        },
        //reserve
        [reserveBike.pending]: (state) => {
            state.loading = true
            state.error = null
            state.bikeReserved = false
        },
        [reserveBike.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bikeReserved = true
            state.AllBikesFetched = false
            state.ReservationsFetched = false
        },
        [reserveBike.rejected]: (state, { payload }) => {
            state.loading = false
            state.bikeReserved = false
            state.error = payload
        },
        // get all bikes
        [getAllBikes.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllBikes.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AllBikesFetched = true
            state.AllBikes = payload
        },
        [getAllBikes.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.AllBikesFetched = false
        },
        // filterBikes bikes
        [filterBikes.pending]: (state) => {
            state.loading = true
            state.filtered = false
            state.error = null
        },
        [filterBikes.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.filtered = true
            state.filteredBikeData = payload
        },
        [filterBikes.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.filtered = false
            // state.AllBikesFetched = false
        },

        // SearchBike bikes
        [SearchBike.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [SearchBike.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.filteredBikeData = payload
        },
        [SearchBike.rejected]: (state, { payload }) => {
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

        // delete bike 
        [deletebike.pending]: (state) => {
            state.loading = true
            state.error = null
            state.Bikedeleted = false
        },
        [deletebike.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.Bikedeleted = true
            state.AllBikesFetched = false
        },
        [deletebike.rejected]: (state, { payload }) => {
            state.loading = false
            state.Bikedeleted = false
        },

        // get user details

        [updateBikeRating.pending]: (state) => {
            state.loading2 = true
            state.ratingUpdated = false
        },
        [updateBikeRating.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.ratingUpdated = true
            state.AllBikesFetched = false
        },
        [updateBikeRating.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.ratingUpdated = false
        },

        [updateBike.pending]: (state) => {
            state.loading2 = true
            state.bikeDetailsUpdated = false
        },
        [updateBike.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.bikeDetailsUpdated = true
            state.AllBikesFetched = false
        },
        [updateBike.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.bikeDetailsUpdated = false
        },

        // update
        [UpdateAvailability.pending]: (state) => {
            state.loading2 = true
            state.error = null
            state.updateBikeAvil = false
        },
        [UpdateAvailability.fulfilled]: (state) => {
            state.loading2 = false
            state.updateBikeAvil = true
            state.AllBikesFetched = false
        },
        [UpdateAvailability.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.error = payload
            state.updateBikeAvil = false
        },


        //add new bike
        [addNewBike.pending]: (state) => {
            state.loading2 = true
            state.newBikeAdded = false
        },
        [addNewBike.fulfilled]: (state, { payload }) => {
            state.loading2 = false
            state.newBikeAdded = true
            state.AllBikesFetched = false
        },
        [addNewBike.rejected]: (state, { payload }) => {
            state.loading2 = false
            state.newBikeAdded = false
        },
    },
})

// const BikeData

export const { resetBikeVariables } = bikeData.actions

export default bikeData.reducer