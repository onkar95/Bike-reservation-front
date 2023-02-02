import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateUser.css";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import FaceIcon from "@material-ui/icons/Face";
// import { useAlert } from "react-alert";
import { getSingleUser, updateProfile } from "../../Redux/Actions/UserAction";
import { verifyUser } from "../../Redux/Actions/AuthActions";
import profileimg from '../../Assets/Profile.png'
import { clearErrors, resetUserVariables } from '../../Redux/Reducers/UserSlice'
import Loading from '../../layout/Loader/Loading'
import Navbar from '../../layout/navbar/Navbar'

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()
  // const alert = useAlert();

  const { userInfo: user, error, userUpdated, loading, singleUserInfo } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profileimg);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    console.log(myForm)
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

  // useEffect(() => {
  //   if (user) {
  //     setName(user?.name)
  //     setEmail(user?.email)
  //   }
  //   if (error) {
  //     // alert.error(error);
  //     dispatch(clearErrors());
  //   }
  //   if (userUpdated) {
  //     // alert.success("Profile Updated Successfully");
  //     dispatch(getSingleUser({ id }))
  //     navigate("/profile");
  //   }
  // }, [error, userUpdated, user, singleUserInfo]);

  useEffect(() => {
    if (singleUserInfo) {
      setName(singleUserInfo?.name)
      setEmail(singleUserInfo?.email)
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());

    }
    if (userUpdated === true) {
      alert("Profile Updated Successfully");
      if (user?._id === id) {
        dispatch(verifyUser())
        // dispatch(resetUserVariables())
      }
      navigate(`/${user?.Role}/allUsers`);
    }
  }, [userUpdated, singleUserInfo]);

  
  return (
    <Fragment>
      {loading ?
        <Loading />
        :
        <Fragment>
          {/* <MetaData title="Update user" /> */}
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update user </h2>

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

export default UpdateUser;
