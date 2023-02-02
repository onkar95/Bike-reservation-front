import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { getSingleBike } from '../../../Redux/Actions/BikeAction'
import bike from '../../../Assets/download.jpg'
import RateImg from '../RateReview/RateImg'
import profilePng from "../../../Assets/Profile.png";
import Review from '../RateReview/Review'
import Loading from '../../../layout/Loader/Loading'

const BikeDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()

    const { singleBikeData, loading, ratingUpdated, loading2 } = useSelector(state => state.bike)
    const { userInfo: user } = useSelector(state => state.user)

    const [hide, sethide] = useState(true);


    useEffect(() => {
        dispatch(getSingleBike({ id }))
    }, [ratingUpdated, id]);

    const handelBikeReserve = (id) => {
        if (user?.Role === undefined || user?.length === 0) {
            alert("please Login first")
        } else {
            navigate(`/${user?.Role}/bikeReserve/${id}`)
        }
    }

    const handelRating = () => {
        if (user?.Role === undefined || user?.length === 0) {
            alert("please Login first")
        } else {
            return sethide(!hide)
        }
    }
    return (
        <>
            {loading || loading2 ?
                <Loading /> :
                <div className='bikeDetails'>
                    <div className='bikeDetails_left'>
                        <div className='bikeDetails_img_block'>
                            <img className='bikeDetails_img' src={bike} alt='on' />

                        </div>
                        <div className='bikeDetails_data'>
                            <div className='bikeDetails_data_div1'>
                                <p className="card-text"><b className=" model">Model:</b>{singleBikeData.Model}</p>
                                <p className="card-text"><b> Location:</b> {singleBikeData.Location}</p>
                                <p className="card-text"><b> Color:</b> {singleBikeData.Color}</p>

                            </div>

                            <div className='bikeDetails_data_div2'>
                                <p className="card-text"><b> Availability:</b> {singleBikeData.Availability}</p>
                                <p className='d-flex'>
                                    <b>Overall Rating:</b>
                                    <RateImg BikeRating={singleBikeData.Rating} bikeID={singleBikeData._id} />
                                </p>
                                <p className="card-text"><b> Mileage:</b> {singleBikeData.Mileage}</p>
                            </div>
                        </div>
                        <div className='reserve_btn_div'>
                            {user?.Role === "user" ? <button className='btn btn-sm btn-outline-primary my-2'
                                disabled={singleBikeData.Availability === "avl" ? false : true}
                                onClick={() => handelBikeReserve(singleBikeData?._id)}>Book A Ride</button> : ""}
                        </div>
                        <div className='bikeDetails_discription'>
                            <div >
                                <b> Specification:</b>
                                {singleBikeData.specification}
                            </div>
                            <p>
                                bicycle, also called bike, two-wheeled steerable machine that is pedaled by the rider's feet. On a standard bicycle the wheels are mounted in-line in a metal frame, with the front wheel held in a rotatable fork. The rider sits on a saddle and steers by leaning and turning handlebars that are attached to the fork.bicycle, also called bike, two-wheeled steerable machine that is pedaled by the rider's feet. On a standard bicycle the wheels are mounted in-line in a metal frame, with the front wheel held in a rotatable fork. The rider sits on a saddle and steers by leaning and turning handlebars that are attached to the fork.
                                bicycle, also called bike, two-wheeled steerable machine that is pedaled by the rider's feet. On a standard bicycle the wheels are mounted in-line in a metal frame, with the front wheel held in a rotatable fork. The rider sits on a saddle and steers by leaning and turning handlebars that are attached to the fork.bicycle, also called bike, two-wheeled steerable machine that is pedaled by the rider's feet. On a standard bicycle the wheels are mounted in-line in a metal frame, with the front wheel held in a rotatable fork. The rider sits on a saddle and steers by leaning and turning handlebars that are attached to the fork.

                            </p>
                        </div>
                    </div>
                    <div className='bikeDetails_right '>
                        <h3 className='text-center'>User Reviews</h3>
                        {user?.Role === "user" ? <button type="button" class="btn btn-primary" onClick={() => handelRating()}>
                            Rate The bike
                        </button> : ""}
                        <div>
                            <Review hide={hide} sethide={sethide} BikeReviews={singleBikeData.reviews}
                                BikeRating={singleBikeData.Rating} userID={user._id} bikeID={singleBikeData._id} />
                        </div>
                        {
                            singleBikeData?.reviews?.map((val, key) => (
                                <div className="reviewCard" >
                                    <img src={profilePng} alt="User" />
                                    <p>{val.user === user._id ? "You" : val.name}</p>
                                    <RateImg BikeRating={val.rating} />
                                    <span className="reviewCardComment">{val.comment}</span>

                                </div>
                            ))
                        }

                    </div>



                </div>}
        </>
    )
}

export default BikeDetail