import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Screens/Home';
import Register from './Screens/Register';
import Navbar from './component/utils/Navbar';
import AddBike from "./component/Admin/AddBike";
import EditUser from "./component/common/EditUser";
import Profile from "./Screens/Profile";
import BikeDetails from "./component/common/BikeDetails";
import AllUsers from "./component/Admin/AllUsers";
import BookABike from "./component/common/BookABike";
import AllBike from "./component/common/AllBikes";
import EditBike from "./component/Admin/EditBike";
import Login from "./Screens/Login";
import Reservations from "./Screens/Reservations";
import Admin from "./component/Admin/Admin";
import User from "./component/User/User";
import DataContext from "./component/context/UserContext";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./Redux/Actions/AuthActions";

function Main() {

    const dispatch = useDispatch()
    const { userInfo, userToken } = useSelector(state => state.user)

    useEffect(() => {
        if (userToken) {
            dispatch(getUserDetails())
        }
    }, [userToken, dispatch])


    return (

        <Router>

            <Routes>

                <Route index element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />
                {/* <Route exact path="/bikeDetail/:id" element={<BikeDetails />} /> */}
                <Route exact path="/login" element={<Login />} />
                <Route excat path="/register" element={<Register />} />

                <Route excat path="/manager" element={<Admin />}>
                    <Route index element={<AllBike />} />
                    <Route path="register" element={<Register />} />
                    <Route exact path="bikeRegistration" element={<AddBike />} />
                    <Route exact path="updateUser/:id" element={<EditUser />} />
                    <Route exact path="updateBike/:id" element={<EditBike />} />
                    <Route path="allUsers" element={<AllUsers />} />
                </Route>

                <Route excat path="/user" element={<User />}>
                    <Route index element={<AllBike />} />
                    <Route exact path="bikeReserve/:id" element={<BookABike />} />
                    <Route exact path="updateUser/:id" element={<EditUser />} />
                </Route>

                <Route excat path="/allrerversations/:id" element={<Reservations />} />
            </Routes>
        </Router>
    );
}

export default Main;
