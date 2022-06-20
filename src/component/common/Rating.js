import axios from 'axios'
import React, { useContext, useState } from 'react'
import DataContext from '../context/UserContext'
import starGray from "../img/Graystar.svg"
import starYellow from "../img/YellowStar.svg"

const Rating = ({ BikeRating, Rate, id, active, bikeID ,userID }) => {
    const {user, setReserveRating, setBikeRating } = useContext(DataContext);

    let [rating, setrating] = useState();
    const [stars, setStars] = useState(0);
    const [Edit, setEdit] = useState(false)


    const handelUpdate = () => {

        const obj = {
            rating
        }
        axios.put(`http://localhost:5000/auth/updateReservation2/${id}`, obj)
            .then(res => {
                console.log(res)
                setReserveRating(false)
                setEdit(false)
            })
            .catch(err => console.log(err))
        setEdit(false)
    }
    const handelUpdateBike = () => {

        const dataobj = {
            Rating: rating,
        }
        axios.put(`http://localhost:5000/auth/updateBike/${bikeID}`, dataobj)
            .then((res) => {
                console.log(res)
                setBikeRating(false)
                setEdit(false)
            })
            .catch((err) => console.log(err))
        setEdit(false)
    }

    const handleEdit = () => {
        if (Rate === 0 || BikeRating === 0) {
            setEdit(true);
        }
    }
    const loc = window.location.pathname
    const path = loc.substring(1, 17);
    const check = () => {
        const valid = true
        if (Rate === 0 && active === true && path === "allrerversations" && userID===user?._id) {
            return valid;
        } else {
            return
        }
    }
    const check2 = () => {
        const valid = true
        if (Rate === 0 && loc === "/"  && userID===user?._id) {
            return valid;
        } else {
            return
        }
    }
    return (
        <div style={{ display: "flex" }} className='m-3'>
            <div>

                {Edit === true && check() ?
                    <div>
                        <button onClick={handelUpdate}>done</button>
                    </div>
                    : ""}
                {Edit === true && check2() ?
                    <button onClick={handelUpdateBike}>done</button> : ""}
                {check() && Edit === false ?
                    <button onClick={handleEdit}>Rate now</button>
                    : ""
                }
                {
                    check2() && Edit === false ?
                        <button onClick={handleEdit}>Rate now</button> : ""

                }
            </div>
            <div>
                {Edit === true ?
                    <div>
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
                    :
                    <>
                        <img
                            alt=''
                            src={Rate >= 1 || BikeRating >= 1 ? starYellow : starGray}
                        />
                        <img
                            alt=''
                            src={Rate >= 2 || BikeRating >= 2 ? starYellow : starGray}
                        />
                        <img
                            alt=''
                            src={Rate >= 3 || BikeRating >= 3 ? starYellow : starGray}
                        />
                        <img
                            alt=''
                            src={Rate >= 4 || BikeRating >= 4 ? starYellow : starGray}
                        />
                        <img
                            alt=''
                            src={Rate >= 5 || BikeRating >= 5 ? starYellow : starGray}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default Rating