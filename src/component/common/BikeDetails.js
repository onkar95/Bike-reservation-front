import React, { useContext, useEffect, useState } from 'react'
import starGray from "../img/Graystar.svg"
import starYellow from "../img/YellowStar.svg"
// import { resataurent } from '../Data/Restaurant';
import { Review } from '../Data/Review';
import { useParams } from 'react-router-dom';
import DataContext from '../context/UserContext';
import { GetAllRestaurant } from '../services/Bikes';


const BikeDetails = () => {
    const { id } = useParams()
    const id1=parseInt(id)
    const [stars, setStars] = useState(0);
    const [resataurent1, setResataurent] = useState();
    let [rating, setRating] = useState(0);
    const [editValue, setEditValue] = useState();
    const [ReviewVal, setReviewVal] = useState("");
    const [reviews, setreviews] = useState(Review);
    const { user } = useContext(DataContext);
    const [Edit, setEdit] = useState(false)

    useEffect(() => {
        console.log(ReviewVal)
        if (ReviewVal === "highest") {
            const hei = Review?.filter((key) => {
                return key.Rating >= 4;
            })
            setreviews(hei)
        } else if (ReviewVal === "latest") {
            const lat = Review?.filter((key) => {
                return key.id === "1"
            })
            setreviews(lat)
        }
        else if (ReviewVal === "lowest") {
            const low = Review?.filter((key) => {
                return key.Rating <= 2;
            })
            setreviews(low)
        }
    }, [ReviewVal]);


    console.log("resataurent1", resataurent1)
    useEffect(() => {
        async function fetchData() {
            const data1 = await GetAllRestaurant()
            const filter = data1.filter((val) => {
                let resta;
                if (val.id === id1) {
                    resta = val;
                    console.log("val",val)
                }

               return resta
            })
            setResataurent(filter[0])
            console.log("data", data1)
            console.log("filter", filter)
        }
        fetchData()
    }, [id, id1]);
 

    const handleEdit = (val) => {
        setEdit(true);
        setEditValue(val)
        setRating(val.Rating)
    }

    const handleDelete = (val) => {
        const ind = reviews.indexOf(val);
        console.log(ind)
        setreviews(reviews.filter((key) => (key.id !== val.id)))
    }
    console.log(reviews)
    return (
        <div>

            <h5 className="card-title">Model: {resataurent1?.model}</h5>
            <p className="card-text">Location:{resataurent1?.location} </p>
            <p className="card-text"> Average Rating:{resataurent1?.avgRating}</p>
            <select className='mx-5 mt-3' onChange={(a) => setReviewVal(a.target.value)}>
                <option value="highest">highest</option>
                <option value="lowest">lowest</option>[0]
                <option value="latest">latest</option>
            </select>
            <div className='m-5 d-flex  '>
                <div className='overflow-scroll w-25' style={{ height: "500px" }}>
                    {reviews.map((val, key) => (
                        <div className="card" id={key} style={{ width: "18rem", margin: "5px" }} onClick={() => handleEdit(val)}>
                            <div className="card-body">
                                {/* <h5 className="card-title">Heighest Review</h5> */}
                                <p>id:{val.id}</p>
                                <p>Rating:{val.Rating}</p>
                                <p>UserName:{val.Username}</p>
                                {Edit && editValue?.id === val.id ?
                                    <div>
                                        <button onClick={() => handleDelete(val)}>delete</button>
                                    </div>
                                    :
                                    " "
                                }
                            </div>
                        </div>
                    ))}
                </div>

               
            </div>
        </div>
    )
}

export default BikeDetails
