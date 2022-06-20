import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './component/Dashboard/Home';
import { useContext } from "react";
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Navbar from './component/utils/Navbar';
import DataContext from "./component/context/UserContext";
import AddBike from "./component/AdminPages/AddBike";
import EditUser from "./component/common/EditUser";
import Profile from "./component/common/Profile";
import BikeDetails from "./component/common/BikeDetails";
import AllUsers from "./component/AdminPages/AllUsers";
import Reservation from "./component/common/Reservation";
import AllBike from "./component/common/AllBikes";
import AllReservations from "./component/common/AllReservations";
import EditBike from "./component/AdminPages/EditBike";

function App() {

  const { user } = useContext(DataContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route exact path="/updateUser/:id" element={<EditUser />} />
        <Route exact path="/updateBike/:id" element={<EditBike />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/bikeRegistration" element={<AddBike />} />
        <Route exact path="/bikeDetail/:id" element={<BikeDetails />} />
        <Route exact path="/reservation/:id" element={<Reservation />} />
        <Route exact path="/login" element={<Login />} />
        <Route excat path="/register" element={<Register />} />
        <Route excat path="/allUsers" element={<AllUsers />} />
        <Route excat path="/allbikes" element={<AllBike />} />
        <Route excat path="/allrerversations/:id" element={<AllReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
