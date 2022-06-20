import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/UserContext';

const AllUsers = () => {
  const navigate = useNavigate();

  const { user } = useContext(DataContext);

  const [Users, setUsers] = useState([]);
  const [Delete,setdeleted] = useState(false);
  const [Users1, setUsers1] = useState([]);

  const handelDelete = (id) => {
    setdeleted(true)
    if (window.confirm("Do you really want to delete") === true) {
      axios.delete(`http://localhost:5000/auth/deleteuser/${id}`)
        .then(res => {
          setdeleted(false)
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    const getdata = async () => {

      await axios.get('http://localhost:5000/auth/users')
        .then(res => setUsers(res.data))
        .catch(err => console.log("err", err))

    }
    if (Users.length === 0) getdata();
    const filterData = async () => {
      const filter = Users?.filter((key) => {
        return key.Role === "user";
      })
      setUsers1(filter)
    }
    if (Users) filterData()

  }, [Users, Delete]);

  return (
    <>
      {user?.Role === "manager" ?
        <div className='resta m-2'>
          <button className=' btn btn-warning resta' onClick={() => navigate('/register')}>
            Add User
          </button>
        </div>
        : ""
      }
      <h3>all users</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {
          Users?.map((val, key) => (

            <div className="card" id={key} style={{ width: "18rem", margin: "5px" }}>
              <div className="card-body">
                <h5 className="card-title">Name:{val.name}</h5>
                <p className="card-text">Email: {val.email}</p>
                <p className="card-text"> Role:{val.Role}</p>

                  <button className=' mx-3 btn-sm  btn btn-outline-primary' onClick={() => navigate(`/allrerversations/${val?._id}`)}>Reservations</button>
                <button className=' mx-3 btn-sm  btn btn-outline-warning' onClick={() => {navigate(`/updateUser/${val?._id}`)}}>Edit</button>
                <button className='mx-3 btn-sm btn btn-outline-danger' onClick={() => handelDelete(val?._id)}>delete</button>
              </div>
            </div>

          ))
        }

      </div>
    </>
  )
}

export default AllUsers