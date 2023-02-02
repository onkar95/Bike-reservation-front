
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../layout/Loader/Loading';
import { cancleReservation, UpdateAvailability } from '../../Redux/Actions/ReservationAction';
import '../../Screens/Screen.css'


const UserReservations = ({ reservData }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    
    const { userInfo: user, loading: userloading } = useSelector(state => state.user)
    const { userReservations, loading, cancledReservation, loadingR } = useSelector(state => state.reserve)
    const { bikeReserved } = useSelector(state => state.bike)
    console.log("userReservations",userReservations)
    console.log("reservData",reservData)

    // let [reservData, setreservData] = useState([])

    // useEffect(() => {
    //     if (cancledReservation || bikeReserved || userReservations?.length === 0) {
    //         dispatch(getAllReservationsByUsers({ id }))
    //     }
    // }, [cancledReservation, bikeReserved, userReservations]);



    // useEffect(() => {
    //     user?.Role !== undefined ? setreservData(userReservations) : setreservData([])
    //     console.log(reservData[0]?.ReservedByUser._id)
    //     console.log(user?._id)
    // }, [userReservations]);


    const cancelreservation = (id, BId) => {
        if (window.confirm("Do you really want cancel") === true) {
            const obj = {
                Active: false,
                id
            }
            const dataobj = { Availability: "avl", BId }
            dispatch(cancleReservation(obj))
            dispatch(UpdateAvailability(dataobj))
        }
    }
    return (


        <div>
            {loading || userloading || loadingR ? <Loading /> :
                <table className="table Customtable ">
                    <thead>
                        <tr>
                            <th scope="col">SR.no</th>
                            <th scope="col">Reserved Bike</th>
                            <th scope="col">Datefrom</th>
                            <th scope="col">Todate</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {reservData && reservData?.length !== 0 ?
                            reservData?.map((val, key) => (

                                <tr id={key}>
                                    <td >{key + 1}</td>
                                    <td >{`${val.Reservedbike?.Model},${val.Reservedbike?.Location}`}</td>
                                    <td >{val.Datefrom}</td>
                                    <td >{val.Todate}</td>
                                    <td >{val.Active === true ? "active" : "cancled"}</td>
                                    <td>{user?._id === val.ReservedByUser?._id && val.Active === true ?
                                        <button className='btn btn-outline-danger' onClick={() => cancelreservation(val._id, val.Reservedbike._id)} disabled={loadingR} >cancel</button>
                                        : ""}</td>
                                </tr>

                            ))
                            :
                            <h3>no reservations</h3>
                        }
                    </tbody>

                </table>}
        </div>


    )
}

export default UserReservations