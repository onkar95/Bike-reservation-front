import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/UserContext';

const Profile = () => {
    const { user } = useContext(DataContext);
    const navigate = useNavigate();

  return (
    <div className="card" id='key'  style={{ width: "18rem", margin: "5px" }}>
    <div className="card-body">
      <h5 className="card-title">Name:{user?.name}</h5>
      <p className="card-text">Email: {user?.email}</p>
      <p className="card-text"> Role:{user?.Role}</p>
      {/* <p className="card-text">Phone: {user?.phoneNo}</p> */}
      <button onClick={() => navigate(`/updateUser/${user?._id}`)}>Edit</button>
    </div>
    </div>
  )
}

export default Profile