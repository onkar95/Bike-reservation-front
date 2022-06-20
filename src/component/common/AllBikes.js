/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/UserContext';
import { GetAllRestaurant } from '../services/Bikes';
import "./common.css"
import Filters from './Filters';
import RatingComp from './Rating';
const AllBike = () => {
  const { user,BikeRating } = useContext(DataContext);
  const [deleted, setdeleted] = useState();


  const [filteredData, setFilteredData] = useState();
  let [filtered, setFiltered] = useState();
  const navigate = useNavigate();


  async function fetchData() {
    console.log("call")
    await axios.get('http://localhost:5000/auth/bikes')
      .then((res) => {
        console.log(res.data)
        setFilteredData(res.data)
        if (user?.Role === "user") {
          let AvlBikes = res.data?.filter((key) => {
            return key.Availability === "avl"
          })
          setFilteredData(AvlBikes)
        } else {
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    fetchData()

  }, [deleted, user,BikeRating]);

  const handelDelete = (id) => {
    setdeleted(false)
    if (window.confirm("Do you really want to delete") === true) {
      axios.delete(`http://localhost:5000/auth/deletebike/${id}`)
        .then(res => {
          console.log(res)
          setdeleted(true)
        })
        .catch(err => console.log(err))
    }
  }
  const data = filtered ? filtered : filteredData

  console.log("filtered", filteredData)

  const handelClear = () => {
    fetchData()
    setFiltered(filteredData)
  }
  return (
    <>

      {user?.Role === "manager" ?
        <div className='resta m-2'>
          <button className=' btn btn-warning resta' onClick={() => navigate('/bikeRegistration')}>
            Add Bike
          </button>
        </div>
        : ""
      }
      <h3 className="">All Bikes</h3>
      <div style={{ display: "flex" }}>
        <div className='m-5 w-25'>
          {/* <button onClick={handelClear}>clear</button> */}
          <Filters filteredData={filteredData} setFiltered={setFiltered} />
        </div>
        <div className='bikes w-75'>

          <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 20px", height: "530px", overflowY: "scroll" }}>
            {user?.Role === "manager" ?
              <>

                {
                  filtered?.length === 0 ? "empty" :

                    data?.map((val, key) => (
                      <div id={key}>

                        <div className="card" style={{ width: "30rem", margin: "5px", height: "10.5rem" }}>
                          <h5 className="card-title text-center">Model:{val.Model}</h5>
                          <div className="card-body d-flex justify-content-between">
                            <div className='left'>
                              <p className="card-text">Location: {val.Location}</p>
                              <p className="card-text">  Rating:{val.Rating}</p>
                            </div>
                            <div className='right'>
                              <p className="card-text">Color: {val.Color}</p>
                              <p className="card-text"> {val.Availability}</p>
                            </div>
                          </div>

                          <div className='d-flex justify-content-evenly'>
                            <button className='btn btn-sm btn-outline-primary' onClick={() => navigate(`/allrerversations/${val?._id}`)}>see reservations</button>
                            <button className='btn btn-sm btn-outline-warning' onClick={() => {
                              navigate(`/updateBike/${val?._id}`)
                            }}>edit</button>
                            <button className='btn btn-sm btn-outline-danger' onClick={handelDelete}>delete</button>
                          </div>
                        </div>
                      </div>
                    ))
                }
              </>

              :
              <>
                {
                  filtered?.length === 0 ?
                    <div className=' w-100 d-flex justify-center align-content-center'><h3 >No match Found</h3> </div>
                    :
                    data?.map((val, key) => (
                      <div id={key}>

                        <div className="card" style={{ width: "30rem", margin: "5px", height: "10.5rem" }}>
                          <h5 className="card-title text-center">Model:{val.Model}</h5>
                          <div className="card-body d-flex justify-content-between">
                            <div className='left'>
                              <p className="card-text">Location: {val.Location}</p>
                              <p className="card-text">  Rating:{val.Rating}</p>
                              {
                                <RatingComp BikeRating={val.Rating} userID={val.UserId} bikeID={val._id}/>
                              }
                            </div>
                            <div className='right'>
                              <p className="card-text">Color: {val.Color}</p>
                              <p className="card-text"> {val.Availability}</p>
                            </div>
                          </div>

                          <div className='d-flex justify-content-evenly'>
                            <button className='btn btn-sm btn-outline-primary' disabled={val.Availability === "avl" ? false : true}
                              onClick={() => navigate(`/reservation/${val?._id}`)}>Resrve</button>
                          </div>
                        </div>
                      </div>

                    )
                    )}
              </>

            }
            {filteredData?.length === 0 ? "nothing to show" : ""}
          </div>
        </div>
      </div>

    </>
  )
}

export default AllBike