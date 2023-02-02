import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import starGray from "../../../Assets/Graystar.svg"
import starYellow from "../../../Assets/YellowStar.svg"
import Loading from '../../../layout/Loader/Loading'
import { updateBikeRating } from '../../../Redux/Actions/BikeAction'
import RateImg from './RateImg'

const Rating = ({ BikeRating, bikeID, userID, userComment, hide, sethide }) => {
    const dispatch = useDispatch()

    const { loading, ratingUpdated } = useSelector(state => state.bike)

    let [rating, setrating] = useState(BikeRating);
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState(userComment);

    const [Edit, setEdit] = useState(false)

    useEffect(() => {
        setComment(userComment)
        setrating(BikeRating)
    }, [userComment, ratingUpdated]);

    console.log("userComment", userComment)

    const handelUpdate = () => {
        dispatch(updateBikeRating({ rating, comment, bikeID, userID }))
        sethide(true)
        return setEdit(false)
    }
    const handleEdit = () => {
        setComment(userComment)
        return setEdit(!Edit)
    }

    return (
        <>
            {loading ?
                <Loading />
                :
                <div style={{ display: "flex" }} className='m-3'>

                    <div>
                        {Edit === true ?
                            <div>
                                <div className='rating'>
                                    <img
                                        alt=''
                                        src={rating >= 1 || stars >= 1 ? starYellow : starGray}
                                        onMouseOver={() => setStars(1)}
                                        onMouseLeave={() => setStars(0)}
                                        onClick={() => setrating(1)}
                                    />
                                    <img
                                        alt=''
                                        src={rating >= 2 || stars >= 2 ? starYellow : starGray}
                                        onMouseOver={() => setStars(2)}
                                        onMouseLeave={() => setStars(0)}
                                        onClick={() => setrating(2)}
                                    />
                                    <img
                                        alt=''
                                        src={rating >= 3 || stars >= 3 ? starYellow : starGray}
                                        onMouseOver={() => setStars(3)}
                                        onMouseLeave={() => setStars(0)}
                                        onClick={() => setrating(3)}
                                    />
                                    <img
                                        alt=''
                                        src={rating >= 4 || stars >= 4 ? starYellow : starGray}
                                        onMouseOver={() => setStars(4)}
                                        onMouseLeave={() => setStars(0)}
                                        onClick={() => setrating(4)}
                                    />
                                    <img
                                        alt=''
                                        src={rating >= 5 || stars >= 5 ? starYellow : starGray}
                                        onMouseOver={() => setStars(5)}
                                        onMouseLeave={() => setStars(0)}
                                        onClick={() => setrating(5)}
                                    />
                                </div>
                                <textarea className='review_textArea' disabled={!Edit} cols={40} rows={4} type="text" value={comment} onChange={(a) => setComment(a.target.value)} resize={false} />
                            </div>

                            :
                            <div className='review_values'>
                                <RateImg BikeRating={BikeRating} />
                                <textarea cols={40} rows={4} disabled={!Edit} style={{ resize: "none" }} type="text" value={comment} onChange={(a) => setComment(a.target.value)} />
                            </div>
                        }
                        <div>

                            {Edit ?
                                <div className='review_btn'>
                                    <button onClick={() => handelUpdate()}>done</button>
                                    <button onClick={() => handleEdit()}>cancle</button>
                                </div>
                                :
                                <button className='review_btn' onClick={() => handleEdit()}>Rate now</button>


                            }

                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Rating