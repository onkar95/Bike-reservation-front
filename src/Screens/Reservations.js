
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BikeReservations from '../component/Admin/BikeAndUserReservations';
import UserReservations from '../component/User/UserReservations';
import Loading from '../layout/Loader/Loading';
import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../Redux/Actions/ReservationAction';
import { resetVariables } from '../Redux/Reducers/ReservSlice';
import useFetchUserReservations from '../hooks/useFetchUserReservations'
import './Screen.css'
import UseReservationHooks from '../hooks/adminhooks/useFetchAdminReservations';


const AllReservations = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { userInfo: user, loading: userloading } = useSelector(state => state.user)
    const { userReservations, ReservationsFetched } = useSelector(state => state.reserve)

    // const { reservData, userReservations } = useFetchUserReservations({ id })
    const { reservDataManager } = UseReservationHooks({ id })

    // console.log("reservData->from custom hooks--->", reservData)
    // console.log("userReservations->from custom hooks---->", userReservations)
    // console.log("reservDataManager->from custom hooks---->", reservDataManager)

    useEffect(() => {
        console.log(reservDataManager)
    }, [reservDataManager])



    return (
        <>
            {

                user?.Role === "manager" ?
                    <BikeReservations />
                    : user?.Role === "user" ?
                        <UserReservations />
                        : ""


            }
        </>
    )
}

export default AllReservations


// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import BikeReservations from '../component/Admin/BikeAndUserReservations';
// import UserReservations from '../component/User/UserReservations';
// import Loading from '../layout/Loader/Loading';
// import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../Redux/Actions/ReservationAction';
// import { resetVariables } from '../Redux/Reducers/ReservSlice';

// import './Screen.css'


// const AllReservations = () => {
//     const { id } = useParams()
//     const dispatch = useDispatch()

//     // const { userReservations } = useFetchUserReservations()
//     const { userInfo: user, loading: userloading } = useSelector(state => state.user)
//     const { userReservations, bikeReservations, loading, cancledReservation, loadingR, ReservationsFetched } = useSelector(state => state.reserve)

//     const { bikeReserved } = useSelector(state => state.bike)
//     let [reservData, setreservData] = useState()


//     useEffect(() => {

//         if (user?.Role === "user" && (cancledReservation || bikeReserved || !ReservationsFetched)) {
//             dispatch(getAllReservationsByUsers({ id }))
//         }
//         if (user?.Role === "user") dispatch(resetVariables())
//     }, [cancledReservation, bikeReserved, id]);


//     useEffect(() => {

//         if (userReservations?.length === 0) {
//             setreservData(bikeReservations)
//         } else if (bikeReservations?.length === 0) {
//             setreservData(userReservations)

//         }
//     }, [userReservations, bikeReservations, id]);



//     useEffect(() => {
//         reservData = userReservations?.length === 0 ? bikeReservations : userReservations
//         if (user?.Role === "user") {
//             setreservData(userReservations)
//         } else if (user?.Role === "manager") {
//             if (userReservations?.length === 0) {
//                 setreservData(bikeReservations)
//             } else if (bikeReservations?.length === 0) {
//                 setreservData(userReservations)
//             }
//         }
//     }, [userReservations, bikeReservations, user, id]);

//     console.log("reservData", reservData)

//     return (
//         <>
//             {loading || userloading || loadingR ?
//                 <Loading /> :

//                 user?.Role === "manager" ?
//                     <BikeReservations />
//                     :
//                     user?.Role === "user" ?
//                         <UserReservations reservData={reservData} />
//                         : ""


//             }
//         </>
//     )
// }

// export default AllReservations



