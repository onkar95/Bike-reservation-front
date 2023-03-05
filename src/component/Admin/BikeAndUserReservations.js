
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../layout/Loader/Loading';
import { getAllReservationsByUsers, getAllReservationsOnBikes } from '../../Redux/Actions/ReservationAction';
import '../../Screens/Screen.css'


const BikeReservations = ({ reservDataManager }) => {

    const { loading: userloading } = useSelector(state => state.user)
    const { loading, loadingR } = useSelector(state => state.reserve)

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

                            {reservDataManager && reservDataManager?.length !== 0 ?
                                reservDataManager?.map((val, key) => (

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