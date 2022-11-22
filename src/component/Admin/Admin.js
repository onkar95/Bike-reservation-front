import React from 'react'
import { Outlet, Route, Router, Routes } from 'react-router-dom'
import Login from '../../Screens/Login'
import Profile from '../../Screens/Profile'
import Reservations from '../../Screens/Reservations'
import AllBike from '../common/AllBikes'
import BikeDetails from '../common/BikeDetails'
import BookABike from '../common/BookABike'
import EditUser from '../common/EditUser'
import Navbar from '../utils/Navbar'
import Addbike from './AddBike'
import AllUsers from './AllUsers'
import EditBike from './EditBike'

const Admin = () => {
    return (
        <div>

            <Navbar />
            <Outlet />

        </div>
    )
}

export default Admin