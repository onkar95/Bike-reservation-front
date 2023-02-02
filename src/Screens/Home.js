import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';
import './Screen.css'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { userInfo, loading } = useSelector(state => state.user)

  useEffect(() => {
    if (userInfo.length !== 0) {
      return navigate(`${userInfo?.Role}`)
    } else {
      return navigate("/user")
    }
  }, [userInfo]);


  return (
    <div className='home'>
      {
        loading ? <Loading /> : ""
      }
    </div>
  )


}

export default Home