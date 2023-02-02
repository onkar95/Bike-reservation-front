import { createSlice } from "@reduxjs/toolkit";
import { Userlogout } from "../Actions/AuthActions";
import { reserveBike } from "../Actions/BikeAction";
import { cancleReservation, filteredReservations, getAllReservations, getAllReservationsByUsers, getAllReservationsOnBikes, updateReservedBikeRating } from "../Actions/ReservationAction";


const initialState = {
    AllReservations: [],
    bikeReservations: [],
    userReservations: [],
    FiltReservations: [],
    loading: false,
    loadingR: false,
    error: null,
    ReservationsFetched: false,
    cancledReservation: false,
    updatedRating: false,
    updatedAvail: false,

}

export const BikeReservations = createSlice({
    name: 'reserve',
    initialState,
    reducers: {
        resetVariables: (state) => {
            if (state.cancledReservation) state.cancledReservation = false
            if (state.updatedRating) state.updatedRating = false
            if (state.updatedAvail) state.updatedAvail = false
        }
    },
    extraReducers: {
        //logout
        [Userlogout.pending]: (state) => {
            state.loading = true
        },
        [Userlogout.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.ReservationsFetched = false
        },
        [Userlogout.rejected]: (state, { payload }) => {
            state.loading = false
        },
        //reserveBike
        [reserveBike.pending]: (state) => {
            state.loading = true
        },
        [reserveBike.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.ReservationsFetched = false
        },
        [reserveBike.rejected]: (state, { payload }) => {
            state.loading = false
        },

        //user
        [getAllReservationsByUsers.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getAllReservationsByUsers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userReservations = payload
            state.ReservationsFetched = true
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
            state.ReservationsFetched = true
        },
        [getAllReservationsOnBikes.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // cancle
        [cancleReservation.pending]: (state) => {
            state.loadingR = true
            state.error = null
            state.cancledReservation = false
        },
        [cancleReservation.fulfilled]: (state, { payload }) => {
            state.loadingR = false
            state.cancledReservation = true
            state.ReservationsFetched = false
        },
        [cancleReservation.rejected]: (state, { payload }) => {
            state.loadingR = false
            state.error = payload
            state.cancledReservation = false
        },

    }
})


export const { resetVariables } = BikeReservations.actions

export default BikeReservations.reducer;