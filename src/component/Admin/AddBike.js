import { Input, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../layout/Loader/Loading';
import { addNewBike } from '../../Redux/Actions/BikeAction';



const Addbike = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { userInfo: user } = useSelector(state => state.user)
    const { loading, loading2, newBikeAdded, error } = useSelector(state => state.bike)

    const [Model, setModel] = useState('')
    const [Location, setLocation] = useState('')
    const [Color, setColor] = useState('')
    const [specification, setSpecification] = useState('')
    const [Mileage, setMileage] = useState('')
    const [MileageUnit, setMileageUnit] = useState('km/hr')

    const [Clicked, setClicked] = useState(false)


    const { Option } = Select;


    const selectAfter = (
        <Select defaultValue="km/hr" onChange={(v) => setMileageUnit(v)}>
            <Option value="km/hr">km/hr</Option>
            <Option value="Mile/hr">Mile/hr</Option>
        </Select>
    );
    const handleSubmit = async (a) => {
        setClicked(true)
        a.preventDefault();
        const dataobj = {
            Model: Model,
            Location: Location,
            Color: Color,
            Mileage: Mileage + MileageUnit,
            specification

        }
        console.log(dataobj)
        dispatch(addNewBike(dataobj))
    }

    useEffect(() => {
        if (Clicked && newBikeAdded) {
            alert("success")
            setClicked(false)
            if (user) return navigate(`/${user?.Role}/allbikes`)
        }
    }, [newBikeAdded, Clicked]);


    return (
        <>
            {loading || loading2 ?
                <Loading /> :
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
                                    {error}
                                    <button className="btn btn-primary btn-block my-3" onClick={handleSubmit}>Save </button>
                                </form>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>}

        </>
    )
}

export default Addbike
