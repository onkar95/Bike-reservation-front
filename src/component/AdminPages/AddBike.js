import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Addbike = () => {
    const [Model, setModel] = useState('')
    const [Location, setLocation] = useState('')
    const [Color, setColor] = useState('')
    const navigate = useNavigate();



    const handleSubmit = async (a) => {
        a.preventDefault();

        const dataobj = {
            Model: Model,
            Location: Location,
            Color: Color,
        }
        axios.post('https://server-bike.herokuapp.com/auth/addBike', dataobj)
            .then((res) => {
                console.log(res)
                alert("success")
                navigate('/allbikes')
            })
            .catch((err) => console.log(err))
    }


    return (
        <>
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
                                {/* <div className="form-group mt-2">
                                    <label htmlFor="rating" > Rating</label>
                                    <input type="text" className="form-control" id="rating" onChange={(e) => setRating(e.target.value)} value={Rating} name='rating' />
                                </div> */}
                                <div className="form-group mt-2">
                                    <label htmlFor="color" > color</label>
                                    <input type="text" className="form-control" id="color" onChange={(e) => setColor(e.target.value)} value={Color} name='color' />
                                </div>
                                <button className="btn btn-primary btn-block my-3" onClick={handleSubmit}>Save </button>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-sm-2" />
            </div>

        </>
    )
}

export default Addbike
