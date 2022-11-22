import { createSlice } from "@reduxjs/toolkit";
import { cancleReservation, filteredReservations, getAllReservations, getAllReservationsByUsers, getAllReservationsOnBikes, UpdateAvailability, updateReservation, updateReservedBikeRating } from "../Actions/ReservationAction";


const initialState = {
    AllReservations: [],
    bikeReservations: [],
    userReservations: [],
    FiltReservations: [],
    loading: false,
    loadingR: false,
    error: null,
    cancled: false,
    updatedRating: false,
    updatedAvail: false,

}

export const BikeReservations = createSlice({
    name: 'reserve',
    initialState,
    reducers: {},
    extraReducers: {

        [getAllReservations.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllReservations.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AllReservations = payload

        },
        [getAllReservations.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        //user
        [getAllReservationsByUsers.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllReservationsByUsers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userReservations = payload
        },
        [getAllReservationsByUsers.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        //bike
        [getAllReservationsOnBikes.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllReservationsOnBikes.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bikeReservations = payload
        },
        [getAllReservationsOnBikes.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // filtered
        [filteredReservations.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [filteredReservations.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.FiltReservations = payload
            state.error = null
        },
        [filteredReservations.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },


        // update
        [UpdateAvailability.pending]: (state) => {
            state.loadingR = true
            state.error = null
            state.updatedAvail = false
        },
        [UpdateAvailability.fulfilled]: (state) => {
            state.loadingR = false
            state.updatedAvail = true
        },
        [UpdateAvailability.rejected]: (state, { payload }) => {
            state.loadingR = false
            state.error = payload
            state.updatedAvail = false
        },


        // cancle
        [cancleReservation.pending]: (state) => {
            state.loadingR = true
            state.error = null
            state.cancled = false
        },
        [cancleReservation.fulfilled]: (state, { payload }) => {
            state.loadingR = false
            state.cancled = true
        },
        [cancleReservation.rejected]: (state, { payload }) => {
            state.loadingR = false
            state.error = payload
            state.cancled = false
        },

        // updateReservedBikeRating
        [updateReservedBikeRating.pending]: (state) => {
            state.loadingR = true
            state.error = null
            state.updatedRating = false
        },
        [updateReservedBikeRating.fulfilled]: (state, { payload }) => {
            state.loadingR = false
            state.updatedRating = true
        },
        [updateReservedBikeRating.rejected]: (state, { payload }) => {
            state.loadingR = false
            state.error = payload
            state.updatedRating = false
        },

    }
})


export default BikeReservations.reducer;