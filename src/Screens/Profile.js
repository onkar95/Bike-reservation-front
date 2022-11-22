import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataContext from '../component/context/UserContext';
import Navbar from '../component/utils/Navbar';
import { getUserDetails } from '../Redux/Actions/AuthActions';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userInfo: user, userUpdated } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getUserDetails())
  }, [userUpdated]);

  return (
    <>
      <Navbar />
      <div className="card" id='key' style={{ width: "18rem", margin: "5px" }}>
        <div className="card-body">
          <h5 className="card-title">Name:{user?.name}</h5>
          <p className="card-text">Email: {user?.email}</p>
          <p className="card-text"> Role:{user?.Role}</p>
          {/* <p className="card-text">Phone: {user?.phoneNo}</p> */}
          <button onClick={() => navigate(`/${user?.Role}/updateUser/${user?._id}`)}>Edit</button>
        </div>
      </div>
    </>
  )
}

export default Profile