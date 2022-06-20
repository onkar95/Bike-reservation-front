import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AllUsers from '../AdminPages/AllUsers';
import AllBikes from '../common/AllBikes';
import DataContext from '../context/UserContext';

const Home = () => {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  console.log("home",user)
  if (!user) navigate('/login')
  return (
    <>


      {user?.Role === "manager" ?
        <AllUsers />
        :
        <AllBikes />
      }


    </>
  )
}

export default Home