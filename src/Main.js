import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Screens/Home';
import Register from './Screens/Register';
import AddBike from "./component/Admin/AddBike";
import Profile from "./Screens/Profile";
import AllUsers from "./component/Admin/AllUsers";
import UpdateUser from "./component/Admin/UpdateUser";
import BookABike from "./component/User/BookABike";
import EditBike from "./component/Admin/EditBike";
import Login from "./Screens/Login";
import Reservations from "./Screens/Reservations";
import Admin from "./component/Admin/Admin";
import User from "./component/User/User";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "./Redux/Actions/AuthActions";
import BikeDetail from "./component/common/bike/BikeDetail";
import AllBike from "./component/common/bike/AllBikes";
import UpdateProfile from "./component/common/user/UpdateProfile";

function Main() {

    const dispatch = useDispatch()
    const { verified } = useSelector(state => state.user)
    console.log("verified", verified)
    useEffect(() => {
        dispatch(verifyUser())
    }, [])



    return (

        <Router>

            <Routes>
                {/* <ProtectedRoute
                    isAdmin={false}
                    exact
                    path="/profile"
                    component={Profile}
                /> */}

                <Route index element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />

                <Route exact path="/login" element={<Login />} />
                <Route excat path="/register" element={<Register />} />


                <Route excat path="/manager" element={<Admin />}>
                    <Route index element={<AllBike />} />
                    <Route path="register" element={<Register />} />
                    <Route exact path="bikeRegistration" element={<AddBike />} />
                    <Route exact path="updateUser/:id" element={<UpdateUser />} />
                    <Route exact path="updateProfile/:id" element={<UpdateProfile />} />
                    <Route exact path="updateBike/:id" element={<EditBike />} />
                    <Route path="allUsers" element={<AllUsers />} />
                    <Route excat path="allrerversations/:id" element={<Reservations />} />
                    <Route path="allbikes" element={<AllBike />} />
                    <Route excat path="bikeDetail/:id" element={<BikeDetail />} />
                </Route>

                <Route excat path="/user" element={<User />}>
                    <Route index element={<AllBike />} />
                    <Route exact path="bikeReserve/:id" element={<BookABike />} />
                    <Route exact path="updateProfile/:id" element={<UpdateProfile />} />
                    <Route excat path="allrerversations/:id" element={<Reservations />} />
                    <Route excat path="bikeDetail/:id" element={<BikeDetail />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default Main;
