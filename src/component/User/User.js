import React from 'react'
import { Outlet } from 'react-router-dom'
import AllBike from '../common/AllBikes'
import Navbar from '../utils/Navbar'

const User = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default User