import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loading from '../../layout/Loader/Loading'
import Navbar from '../../layout/navbar/Navbar'


const Admin = () => {
    const { loading } = useSelector(state => state.user)

    return (
        <div>
            {
                loading ? <Loading /> :
                    <>
                        <Navbar />
                        <Outlet />
                    </>
            }
        </div>
    )
}

export default Admin