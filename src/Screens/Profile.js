import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import Loading from "../layout/Loader/Loading";
import Navbar from "../layout/navbar/Navbar";
import MetaData from "../layout/utils/MetaData";
import { verifyUser } from "../Redux/Actions/AuthActions";
import { resetUserVariables } from "../Redux/Reducers/UserSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const alert = useAlert();

  const { userInfo: user, loading, userUpdated, verified } = useSelector((state) => state.user);

 

  const getUser = (id) => {
    navigate(`/${user?.Role}/UpdateProfile/${id}`)
  }

  useEffect(() => {
    if (verified === false || verified===undefined) {
      return navigate('/')
    }
  }, [verified]);

  return (

    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Navbar />
          {verified ? <MetaData title={`${user.name}'s Profile`} /> : ""}
          <div className="profileContainer">
            <div className="profileContainer_1">
              <h1>My Profile</h1>
              <img src={user?.avatar?.url} alt={user.name} />
              <button onClick={() => getUser(user?._id)}>Edit Profile</button>
            </div>
            <div className="profileContainer_2">
              <section>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </section>
              <section>
                <h4>Email</h4>
                <p>{user.email}</p>
              </section>
              <section>
                <h4>Joined On </h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </section>
            </div>
            <div className="profileContainer_3">
              <section>
                <h4>Role</h4>
                <p>{user.Role}</p>
              </section>

            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
