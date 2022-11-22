import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBike, updateBike } from '../../Redux/Actions/BikeAction';

const EditBike = () => {
    const dispatch = useDispatch()
    const { singleBikeData } = useSelector(state => state.bike)
    const { userInfo: user } = useSelector(state => state.user)


    const [Rating, setRating] = useState()
    const [Model, setModel] = useState()
    const [Location, setLocation] = useState()
    const [Color, setColor] = useState()
    const [Availability, setAvailability] = useState()


    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        setModel(singleBikeData?.Model)
        setRating(singleBikeData?.Rating)
        setLocation(singleBikeData?.Location)
        setColor(singleBikeData?.Color)
        setAvailability(singleBikeData?.Availability)

    }, [singleBikeData]);

    useEffect(() => {
        dispatch(getSingleBike({ id }))
    }, [id, user]);

    const handleSubmit = async (a) => {
        a.preventDefault();

        const dataobj = {
            Model: Model,
            Rating: Rating,
            Location: Location,
            Color: Color,
            Availability: Availability,
        }
        dispatch(updateBike({ id, dataobj }))
        alert("success")
        navigate(`/${user?.Role}`)
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-2" />

                <div className="col-sm-8">
                    <div>
                        <h4 className="text-muted text-center mb-5"> add you here </h4>

                        <div className="card p-5 shadow">

                            <form >
                                <div className="form-group mt-2">
                                    <label htmlFor="name" >Model name </label>
                                    <input type="name" className="form-control" id="name" onChange={(e) => setModel(e.target.value)} value={Model} name='name' />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="Location" >Location </label>
                                    <input type="text" className="form-control" id="Location" onChange={(e) => setLocation(e.target.value)} value={Location} name='Location' />
                                </div>
                                {/* {OldData ===true? <div className="form-group mt-2">
                                    <label htmlFor="rating" > Rating</label>
                                    <input type="text" className="form-control" id="rating" onChange={(e) => setRating(e.target.value)} value={Rating} name='rating' />
                                </div>:""} */}
                                <div className="form-group mt-2">
                                    <label htmlFor="color" > color</label>
                                    <input type="text" className="form-control" id="color" onChange={(e) => setColor(e.target.value)} value={Color} name='color' />
                                </div>
                                <div className="form-group mt-2">
                                    {/* <label htmlFor="Availability" > Availability</label> */}
                                    <input type="radio" id="Availability" checked={Availability === "avl" ? true : false} onChange={(e) => setAvailability(e.target.value)} value="avl" name='Availability' />
                                    <label htmlFor="Availability" className='mx-3' > Availabel</label>

                                    <input type="radio" id="Availability" checked={Availability === "Not available" ? true : false} onChange={(e) => setAvailability(e.target.value)} value="Not available" name='Availability' />
                                    <label htmlFor="Availability" > Not Availabel</label>
                                </div>
                                <button className="btn btn-primary btn-block my-3" onClick={handleSubmit}>Save </button>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-sm-2" />
            </div>
        </div>
    )
}

export default EditBike