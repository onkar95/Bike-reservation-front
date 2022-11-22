import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUser } from '../../Redux/Actions/UserAction';

const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userInfo: user, loading, AllUser, userDeleted } = useSelector(state => state.user)

  const handelDelete = (id) => {
    if (window.confirm("Do you really want to delete") === true) {

      dispatch(deleteUser({ id }))
    }
  }

  useEffect(() => {
    if (AllUser.length === 0) dispatch(getAllUser())
  }, [userDeleted]);

  return (
    <>
      {loading === false ?
        <div>
          {user?.Role === "manager" ?
            <div className='resta m-2'>
              <button className=' btn btn-warning resta' onClick={() => navigate(`/${user.Role}/register`)}>
                Add User
              </button>
            </div>
            : ""
          }
          <h3>all users</h3>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {
              AllUser?.map((val, key) => (

                <div className="card" id={key} style={{ width: "18rem", margin: "5px" }}>
                  <div className="card-body">
                    <h5 className="card-title">Name:{val.name}</h5>
                    <p className="card-text">Email: {val.email}</p>
                    <p className="card-text"> Role:{val.Role}</p>

                    <button className=' mx-3 btn-sm  btn btn-outline-primary' onClick={() => navigate(`/allrerversations/${val?._id}`)}>Reservations</button>
                    <button className=' mx-3 btn-sm  btn btn-outline-warning' onClick={() => {
                      navigate(`/${user?.Role}/updateUser/${val?._id}`)
                    }}>Edit</button>
                    <button className='mx-3 btn-sm btn btn-outline-danger' onClick={() => handelDelete(val?._id)}>delete</button>
                  </div>
                </div>

              ))
            }

          </div>
        </div>
        :
        <div style={{ width: "100%", minHeight: "100%", backgroundColor: "#d3c8c8" }}>
          <h3 style={{ width: "100%", minHeight: window.innerHeight, alignItems: "center", display: "flex", justifyContent: "center", color: "red" }}>Loading</h3>
        </div>
      }
    </>
  )
}

export default AllUsers