import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../Redux/Actions/UserAction'
import { resetUserVariables } from '../../Redux/Reducers/UserSlice'
// import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../Redux/Actions/ReservationAction'


const CustomHooks = () => {
    const dispatch = useDispatch()

    const { userInfo: user, loading, AllUser, userDeleted, userUpdated, userCreated, verified } = useSelector(state => state.user)

    useEffect(() => {

        if (verified === true && (userDeleted || userUpdated || userCreated || AllUser?.length === 0)) {
            dispatch(getAllUser())
            dispatch(resetUserVariables())
        }

    }, [userDeleted, userUpdated, userCreated]);
    // const userdata = AllUser
    return { AllUser }
}

export default CustomHooks




