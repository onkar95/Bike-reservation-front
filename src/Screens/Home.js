import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../Redux/Actions/AuthActions';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { userInfo, userToken, loading } = useSelector(state => state.user)
  console.log("home", userInfo)

  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails())
    }
    // if (userToken === null) navigate("/login");
  }, [userToken, dispatch])

  useEffect(() => {
    if (userInfo !== undefined && userInfo.length !== 0) {
      return navigate(`${userInfo?.Role}`)
    } else {
      return navigate("/user")
    }
  }, [userInfo]);


  return (
    <>
      {
        loading ?
          <h2>loading</h2>
          :
          ""}
    </>
  )


}

export default Home