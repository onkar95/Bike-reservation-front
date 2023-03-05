import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../Redux/Actions/ReservationAction'
import { resetVariables } from '../Redux/Reducers/ReservSlice'

const useFetchUserReservations = ({ id }) => {

    const dispatch = useDispatch()

    const { userInfo: user, loading: userloading } = useSelector(state => state.user)
    const { userReservations, cancledReservation, ReservationsFetched } = useSelector(state => state.reserve)
    const { bikeReserved } = useSelector(state => state.bike)

    let [reservData, setreservData] = useState([])


    useEffect(() => {

        if (user?.Role === "user" && (cancledReservation || bikeReserved || !ReservationsFetched)) {
            dispatch(getAllReservationsByUsers({ id }))
        }
        if (user?.Role === "user") dispatch(resetVariables())
    }, [cancledReservation, bikeReserved, id]);

    useEffect(() => {
        if (user?.Role === "user") {
            setreservData(userReservations)

        } else {
            setreservData([])
        }
    }, [userReservations, user]);


    return { reservData, userReservations }


}



export default useFetchUserReservations

