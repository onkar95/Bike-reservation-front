
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../layout/Loader/Loading';
import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../../Redux/Actions/ReservationAction';
import '../../Screens/Screen.css'


const BikeReservations = ({reservData}) => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { userInfo: user, loading: userloading } = useSelector(state => state.user)
    const { userReservations, bikeReservations, loading, cancledReservation, loadingR } = useSelector(state => state.reserve)

    let reservData1 = []
    reservData1 = userReservations?.length === 0 ? bikeReservations : userReservations




    return (
        <div>
            {loading || userloading || loadingR ? <Loading />
                :
                <div>
                    <table className="table Customtable">
                        <thead>
                            <tr>
                                <th scope="col">SR.no</th>
                                <th scope="col">User Info</th>
                                <th scope="col">Reserved Bike</th>
                                <th scope="col">Datefrom</th>
                                <th scope="col">Todate</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {reservData && reservData?.length !== 0 ?
                                reservData?.map((val, key) => (

                                    <tr id={key}>
                                        <td >{key + 1}</td>
                                        <td >{val.ReservedByUser?.name}</td>
                                        <td >{`${val.Reservedbike?.Model},${val.Reservedbike?.Location}`}</td>
                                        <td >{val.Datefrom}</td>
                                        <td >{val.Todate}</td>
                                        <td >{val.Active === true ? "active" : "cancled"}</td>
                                    </tr>

                                ))
                                :
                                <h3>no reservations</h3>
                            }
                        </tbody>

                    </table>
                </div>}

        </div>
    )
}

export default BikeReservations