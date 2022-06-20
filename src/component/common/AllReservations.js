import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DataContext from '../context/UserContext';
import RatingCompo from './Rating';

const AllReservations = () => {
    const { user, ReserveRating } = useContext(DataContext);

    const { id } = useParams()
    const [cancel, setcancel] = useState();
    const [AllReservations, setAllReservations] = useState();
    const [FilteredReservations, setFilteredReservations] = useState(AllReservations);
    useEffect(() => {
        axios.get(`http://localhost:5000/auth/reservations`)
            .then(res => {
                setAllReservations(res.data)
            })
            .catch(err => console.log(err))
    }, [cancel, ReserveRating]);
    useEffect(() => {
        axios.get(`http://localhost:5000/auth/reservations?_sort=${"Active"}&_order=dsc`)
            .then(res => {
                console.log("sorted",res.data)
                setAllReservations(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (AllReservations?.length !== 0) {
            const filter = AllReservations?.filter((key) => {
                return key.BikeId?.toLowerCase().includes(id?.toLowerCase()) || key.UserId?.toLowerCase().includes(id?.toLowerCase())
            })
            setFilteredReservations(filter)
        }
    }, [id, AllReservations]);

    const UpdateAvailability = async (BId) => {

        const dataobj = { Availability: "avl" }
        axios.put(`http://localhost:5000/auth/updateBike/${BId}`, dataobj)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    const cancelReseration = (id, BId) => {
        setcancel(true)
        if (window.confirm("Do you really want cancel") === true) {
            const obj = {
                Active: false,
            }
            axios.put(`http://localhost:5000/auth/updateReservation/${id}`, obj)
                .then(res => {
                    console.log(res)
                    UpdateAvailability(BId)
                    setcancel(false)
                })
                .catch(err => console.log(err))
        }
    }
    console.log("AllReservations", AllReservations)
    return (
        <div>
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
                        {/* {user?._id===val.UserId? <th scope="col">cancelReseration</th>:""} */}
                    </tr>
                </thead>
                <tbody>

                    {FilteredReservations?.length !== 0 ?
                        FilteredReservations?.map((val, key) => (
                           
                                <tr id={key}>
                                    <td >{key + 1}</td>
                                    <td >{val.UserId}</td>
                                    <td >{val.BikeId}</td>
                                    <td >{val.Datefrom}</td>
                                    <td >{val.Todate}</td>
                                    <td >{val.Active === true ? "active" : "cancled"}</td>
                                    {/* {val.Active===true?<td><RatingCompo Rate={val.Rate} id={val._id}/></td>:""} */}
                                    <td><RatingCompo Rate={val.Rate} id={val._id} userID={val.UserId} active={val.Active} /></td>
                                    {user?._id === val.UserId && val.Active === true ? <button className='btn btn-outline-danger' onClick={() => cancelReseration(val._id, val.BikeId)} >cancel</button> : ""}
                                </tr>
                           
                        ))
                        :
                        <h3>no reservations</h3>
                    }
                </tbody>

            </table>
        </div>
    )
}

export default AllReservations