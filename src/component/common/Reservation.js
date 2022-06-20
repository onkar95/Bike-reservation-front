/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DataContext from '../context/UserContext';

const Reservation = () => {
    const { user } = useContext(DataContext);
    const { id } = useParams()
    const navigate = useNavigate();

    const [Datefrom, setDatefrom] = useState("");
    const [Todate, setTodate] = useState("");

    const UpdateAvailability = async () => {

        const dataobj = { Availability: "Not available" }
        axios.put(`https://server-bike.herokuapp.com/auth/updateBike/${id}`, dataobj)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    const handelReservation = () => {
        const obj = {
            UserId: user?._id,
            BikeId: id,
            Datefrom: Datefrom,
            Todate: Todate

        }
        console.log(Datefrom)
        console.log(Todate)
        if (Datefrom !== "" && Todate !== "") {

            axios.post(`https://server-bike.herokuapp.com/auth/ReserveBike`, obj)
                .then((res) => {
                    console.log(res)
                    UpdateAvailability()
                    alert("success")
                    navigate('/')
                })
                .catch((err) => console.log(err))
        } else {
            alert("select date first")
        }
    }

    const handelDate = (a) => {
        setTodate(a.target.value)
    }

    return (
        <div>
            <h4>Date</h4>
            <div>
                <label>date from: </label>
                <input type="date" value={Datefrom} onChange={(a) => {
                    console.warn(a.target.value)
                    setDatefrom(a.target.value)
                }} />
                <lable>To date: </lable>
                <input type="date" value={Todate} onChange={handelDate} />
            </div>
            <button onClick={handelReservation}>book</button>
        </div>
    )
}

export default Reservation