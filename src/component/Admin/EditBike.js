import React, { useEffect, useState } from 'react'
import { Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBike, updateBike } from '../../Redux/Actions/BikeAction';
import Loading from '../../layout/Loader/Loading';



const EditBike = () => {
    const dispatch = useDispatch()
    const { singleBikeData, loading2, bikeDetailsUpdated, updateBikeAvil } = useSelector(state => state.bike)
    const { userInfo: user } = useSelector(state => state.user)
    const { Option } = Select;


    const [Rating, setRating] = useState()
    const [Model, setModel] = useState()
    const [Location, setLocation] = useState()
    const [Color, setColor] = useState()
    const [Availability, setAvailability] = useState()
    const [specification, setSpecification] = useState('')
    const [Mileage, setMileage] = useState('')
    const [MileageUnit, setMileageUnit] = useState('km/hr')

    const [Clicked, setClicked] = useState(false)



    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        setModel(singleBikeData?.Model)
        setRating(singleBikeData?.Rating)
        setLocation(singleBikeData?.Location)
        setColor(singleBikeData?.Color)
        setAvailability(singleBikeData?.Availability)
        setSpecification(singleBikeData?.specification)
        setMileage(singleBikeData?.Mileage)

    }, [singleBikeData]);

    useEffect(() => {
        dispatch(getSingleBike({ id }))
    }, [id, user]);

    const handleSubmit = async (a) => {
        a.preventDefault();
        setClicked(true)
        const dataobj = {
            Model: Model,
            Rating: Rating,
            Location: Location,
            Color: Color,
            Availability: Availability,
            Mileage: Mileage + MileageUnit,
            specification
        }
        dispatch(updateBike({ id, dataobj }))
    }

    useEffect(() => {
        if (Clicked && (bikeDetailsUpdated || updateBikeAvil)) {
            alert("success")
            setClicked(false)
            if (user) return navigate(`/${user?.Role}`)
        }
    }, [bikeDetailsUpdated, Clicked, updateBikeAvil]);

    const selectAfter = (
        <Select defaultValue="km/hr" onChange={(v) => setMileageUnit(v)}>
            <Option value="km/hr">km/hr</Option>
            <Option value="Mile/hr">Mile/hr</Option>
        </Select>
    );
    return (
        <div>
            {loading2 ? <Loading /> :
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
                                    <div className="form-group mt-2">
                                        <label htmlFor="Mileage" > Mileage:</label>
                                        <Input type='number' style={{ width: 300 }} addonAfter={selectAfter} onChange={(e) => setMileage(e.target.value)} value={Mileage} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="specification" > specification</label>
                                        <input type="text" className="form-control" id="specification" onChange={(e) => setSpecification(e.target.value)} value={specification} name='specification' />
                                    </div>
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
                </div>}
        </div>
    )
}

export default EditBike