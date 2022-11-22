
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Rating from '../component/common/Rating';
import Navbar from '../component/utils/Navbar';
import { cancleReservation, getAllReservationsByUsers, getAllReservationsOnBikes, UpdateAvailability } from '../Redux/Actions/ReservationAction';

const AllReservations = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { userInfo: user, loading: userloading } = useSelector(state => state.user)
    const { bikeReservations, userReservations, loading, cancled, updatedRating, loadingR } = useSelector(state => state.reserve)
    let [reservData, setreservData] = useState([])
    console.log("id", id)
    useEffect(() => {
        if (user?.Role === "user") {
            if (userReservations?.length === 0 || userReservations === undefined) dispatch(getAllReservationsByUsers({ id }))
        } else if (user?.Role === "manager") {
            dispatch(getAllReservationsOnBikes({ id }))
            dispatch(getAllReservationsByUsers({ id }))
            // if (bikeReservations?.length !== 0 || bikeReservations === undefined) dispatch(getAllReservationsOnBikes({ id }))
            // if (userReservations?.length !== 0 || userReservations === undefined) dispatch(getAllReservationsByUsers({ id }))
        }
    }, [user, updatedRating, cancled]);


    useEffect(() => {

        if (user?.Role === "user") {
            setreservData(userReservations)
        } else {
            if (bikeReservations.length !== 0) {
                setreservData(bikeReservations)
            } else {
                setreservData(userReservations)
            }
        }
    }, [userReservations, bikeReservations, user]);

    useEffect(() => {

        if (user && user?.Role === "user" && updatedRating === true && cancled === true) {
            dispatch(getAllReservationsByUsers({ id }))
            reservData = userReservations
        } else if (user?.Role === "manager" && updatedRating === true && cancled === true) {
            dispatch(getAllReservationsOnBikes({ id }))
            dispatch(getAllReservationsByUsers({ id }))
            reservData = bikeReservations.length !== 0 ? bikeReservations : userReservations
        }
    }, [updatedRating, cancled,]);






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
        <>
            {!loading ?
                <div>
                    <Navbar />
                    <table style={{
                        border: "2px solid gray"
                    }} className="table">
                        <thead>
                            <tr>
                                <th scope="col">SR.no</th>
                                <th scope="col">USerId</th>
                                <th scope="col">bikeId</th>
                                <th scope="col">Datefrom</th>
                                <th scope="col">Todate</th>
                                <th scope="col">Status</th>
                                <th scope="col">Rate</th>
                                {/* {user?._id===val.UserId? <th scope="col">updateReservation</th>:""} */}
                            </tr>
                        </thead>
                        <tbody>

                            {reservData && reservData?.length !== 0 ?
                                reservData && reservData?.map((val, key) => (

                                    <tr id={key}>
                                        <td >{key + 1}</td>
                                        <td >{val.UserId}</td>
                                        <td >{val.BikeId}</td>
                                        <td >{val.Datefrom}</td>
                                        <td >{val.Todate}</td>
                                        <td >{val.Active === true ? "active" : "cancled"}</td>
                                        {/* {val.Active===true?<td><RatingCompo Rate={val.Rate} id={val._id}/></td>:""} */}
                                        <td><Rating ReservationRate={val.Rate} Reservationid={val._id} userID={val.UserId} active={val.Active} /></td>
                                        {user?._id === val.UserId && val.Active === true ?
                                            <button className='btn btn-outline-danger' onClick={() => cancelreservation(val._id, val.BikeId)} disabled={loadingR} >cancel</button>
                                            : ""}
                                    </tr>

                                ))
                                :
                                <h3>no reservations</h3>
                            }
                        </tbody>

                    </table>
                </div>
                :
                <div style={{ width: "100%", minHeight: "100%", backgroundColor: "#d3c8c8" }}>
                    <h3 style={{ width: "100%", minHeight: window.innerHeight, alignItems: "center", display: "flex", justifyContent: "center", color: "red" }}>Loading</h3>
                </div>
            }
        </>
    )
}

export default AllReservations