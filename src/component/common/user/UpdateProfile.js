import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateProfile.css";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";

import { clearErrors, resetUserVariables } from "../../../Redux/Reducers/UserSlice";
import { getSingleUser, updateProfile } from "../../../Redux/Actions/UserAction";
import { verifyUser } from "../../../Redux/Actions/AuthActions";
import Loading from "../../../layout/Loader/Loading";
import MetaData from "../../../layout/utils/MetaData";
import profileimg from '../../../Assets/Profile.png'

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()
  // const alert = useAlert();

  const { userInfo: user, error, userUpdated, loading, singleUserInfo } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url);
  const [submited, setsubmited] = useState(false);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    console.log(myForm)
    setsubmited(true)
    dispatch(updateProfile({ myForm, id }));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user?.name)
      setEmail(user?.email)
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());

    }
    if (userUpdated === true) {
      alert("Profile Updated Successfully");
      dispatch(verifyUser())
     if(user?.Role ==="user") dispatch(resetUserVariables())
      navigate("/profile");
    }
  }, [userUpdated]);
  return (
    <Fragment>
      {loading ?
        <Loading />
        :
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default UpdateProfile;
