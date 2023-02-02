import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Loading from '../../layout/Loader/Loading'
import Navbar from '../../layout/navbar/Navbar'

const User = () => {
    const { loading } = useSelector(state => state.user)

    return (
        <div>

            <div>
                {
                    loading ? <Loading /> :
                        <>
                            <Navbar />
                            <Outlet />
                        </>
                }
            </div>
        </div>
    )
}

export default User