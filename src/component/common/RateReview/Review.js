import React, { useEffect, useState } from 'react'
import Rating from './Rating';
import './RateReview.css'
import { useSelector } from 'react-redux';
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from '../../../layout/Loader/Loading';

const Review = ({ BikeRating, BikeReviews, userID, bikeID, hide, sethide }) => {
    const { loading, ratingUpdated, loading2 } = useSelector(state => state.bike)
    const { userInfo: user } = useSelector(state => state.user)

    const [userComment, setUserComment] = useState("");
    const handelRating = () => {
        return sethide(!hide)
    }
    useEffect(() => {
        BikeReviews?.filter((key) => {
            return key.user === user._id ? setUserComment(key.comment) : ""
        })
        // sethide(false)
        console.log("userComment", userComment)
    }, [BikeReviews, loading, ratingUpdated]);
    return (
        <>
            {
                loading || loading2 ?

                    <Loading />
                    :
                    <div className={hide ? "hidden" : "visible"}>
                        <div class="Review_popup" >
                            <div className='close_btn' onClick={() => handelRating()} ><AiOutlineCloseCircle style={{ fontSize: "2rem" }} /></div>

                            <Rating hide={hide} sethide={sethide} userComment={userComment} BikeRating={BikeRating} userID={userID} bikeID={bikeID} />
                        </div>
                    </div>
            }
        </>
    )
}

export default Review