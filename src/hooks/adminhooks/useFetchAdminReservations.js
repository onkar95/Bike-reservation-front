

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../../Redux/Actions/ReservationAction'


const UseReservationHooks = ({ id }) => {
    const dispatch = useDispatch()
    const { userInfo: user } = useSelector(state => state.user)
    const { userReservations, ReservationsFetched } = useSelector(state => state.reserve)
    const { bikeReservations } = useSelector(state => state.bike)
    let [reservDataManager, setreservDataManager] = useState([])


    useEffect(() => {
        if (user?.Role === "manager") {
            dispatch(getAllReservationsByUsers({ id }))
            dispatch(getAllReservationsOnBikes({ id }))
        }
    }, [user, id]);

    useEffect(() => {
        if (user?.Role === "manager") {
            if (userReservations?.length === 0) {
                setreservDataManager(bikeReservations)
            } else if (bikeReservations?.length === 0) {
                setreservDataManager(userReservations)
            }
        }
    }, [userReservations, bikeReservations, user, id]);

    useEffect(() => {
        console.log(reservDataManager)
    }, [reservDataManager])
    console.log("reservDataManager", reservDataManager)


    return { reservDataManager, userReservations, bikeReservations }
}

export default UseReservationHooks

