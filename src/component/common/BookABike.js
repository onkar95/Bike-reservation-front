/* eslint-disable no-use-before-define */
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { reserveBike } from '../../Redux/Actions/BikeAction';
import { UpdateAvailability } from '../../Redux/Actions/ReservationAction';

const BookABike = () => {
    const { userInfo: user } = useSelector(state => state.user)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const [Datefrom, setDatefrom] = useState("");
    const [Todate, setTodate] = useState("");

    const handelReservation = () => {
        const obj = {
            UserId: user?._id,
            BikeId: id,
            Datefrom: Datefrom,
            Todate: Todate

        }
        if (Datefrom !== "" && Todate !== "") {

            dispatch(reserveBike(obj))
            dispatch(UpdateAvailability({ Availability: "Not available", BId: id }))
            alert("success")
            navigate('/')

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

export default BookABike