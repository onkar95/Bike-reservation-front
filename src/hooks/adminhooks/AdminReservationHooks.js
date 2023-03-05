

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../../Redux/Actions/ReservationAction'


const AdminReservationHooks = ({ id }) => {
    const dispatch = useDispatch()

    const { userInfo: user } = useSelector(state => state.user)
    const { userReservations, ReservationsFetched, bikeReservations } = useSelector(state => state.reserve)
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
                return setreservDataManager(bikeReservations)
            } else if (bikeReservations?.length === 0) {
                return setreservDataManager(userReservations)
            }
        }
    }, [userReservations, bikeReservations]);


    return { reservDataManager, userReservations, bikeReservations }
}

export default AdminReservationHooks

