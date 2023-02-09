
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import bike1 from '../../../Assets/download.jpg'
import bike2 from '../../../Assets/ktm.jpg'
import bike3 from '../../../Assets/bike.jpg'

import { deletebike } from '../../../Redux/Actions/BikeAction';
import { getAllReservationsOnBikes } from '../../../Redux/Actions/ReservationAction';
import RateImg from '../RateReview/RateImg';

export default function BikeCard({ val, key }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { userInfo: user } = useSelector(state => state.user)

    const handelBikeReserve = (id) => {
        if (user?.Role === undefined || user?.length === 0) {
            alert("please Login first")
        } else {
            navigate(`/${user?.Role}/bikeReserve/${id}`)
        }
    }

    const getBikereservations = (id) => {
        dispatch(getAllReservationsOnBikes({ id }))
        navigate(`/${user?.Role}/allrerversations/${val?._id}`)
    }
    const handelBikeDelete = (id) => {
        console.log(id)
        if (window.confirm("Do you really want to delete") === true) {
            dispatch(deletebike({ id }))
        }
    }

    const images = [bike1, bike2, bike3]

    const randomimg = images[Math.floor(Math.random() * images.length)];
    return (



        <div id={key}>

            <div className="customCard" >
                <img className='bike_img' src={randomimg} alt='on' />
                <div className='card_info'>
                    <div className='card_info_r1'>
                        <p className="card-text"><h5 className=" fw-bold">{val.Model}</h5></p>
                        <p className="d-flex">
                            <RateImg BikeRating={val.Rating} />
                            <p>({val.numOfReviews})</p>
                        </p>
                    </div>
                    <div className="card_info_r2">
                        <p className="card-text "><b> Location:</b> {val.Location}</p>
                        {user?.Role === "user" || user?.Role === undefined ?
                            <p className={val.Availability !== "avl" ? "text-danger fw-bold " : "text-success fw-bold"}>
                                {val.Availability}
                            </p>
                            :
                            user?.Role === "manager" ?
                                <button type="button" class="btn btn-link btn-sm m-0 p-0" onClick={() => navigate(`/${user?.Role}/bikeDetail/${val?._id}`)}>
                                    Read More
                                </button> :
                                ""
                        }
                    </div>
                </div>

                {user?.Role === "manager" ?

                    <div className='d-flex justify-content-evenly buttons'>
                        <button className='btn btn-sm btn-outline-primary'
                            onClick={() => getBikereservations(val?._id)}>see reservations
                        </button>
                        <button className='btn btn-sm btn-outline-warning'
                            onClick={() => {
                                navigate(`/${user?.Role}/updateBike/${val?._id}`)
                            }}>edit
                        </button>
                        <button className='btn btn-sm btn-outline-danger' onClick={() => handelBikeDelete(val?._id)}>delete</button>
                    </div>
                    :
                    // user?.Role === "user" ?
                    <div className='d-flex justify-content-evenly buttons'>
                        <button className='btn btn-sm btn-outline-primary' disabled={val.Availability === "avl" ? false : true}
                            onClick={() => handelBikeReserve(val?._id)}>Resrve</button>

                        <button type="button" class="btn btn-primary" onClick={() => navigate(`/${user?.Role ? user?.Role : 'user'}/bikeDetail/${val?._id}`)}>
                            More
                        </button>
                    </div>
                }
            </div>
        </div>


    );
}
