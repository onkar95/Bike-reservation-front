/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import { logout } from '../../Redux/Reducers/UserSlice'
import { Userlogout } from '../../Redux/Actions/AuthActions'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.user)

    const logoutUser = () => {
        dispatch(logout())
        dispatch(Userlogout())
    };

    const [Disabled, setDisabled] = useState(true)


    useEffect(() => {
        if (userInfo?.length === 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [userInfo])
    return (
        <>


            <nav className="navbar navbar-expand-lg navbar-light bg-dark Navbar">
                <Link className="navbar-brand " to='/' style={{ color: "white" }}>Rent A bike</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userInfo?.length === 0 ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <button className=' mx-3  btn btn-outline-primary' disabled={Disabled} onClick={() =>
                                    navigate('/login')}>
                                    Login
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className=' mx-3  btn btn-outline-primary' disabled={Disabled} onClick={() =>
                                    navigate('/register')}>
                                    Register
                                </button>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={() => logoutUser()}>
                                    logout
                                </button>
                                <button className='btn btn-outline-danger' onClick={() => navigate('/profile')}>
                                    My Profile
                                </button>
                            </li>
                        </ul>
                    }

                </div>
                {
                    userInfo?.Role === "manager" ?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <button className=' btn btn-outline-warning' onClick={() => navigate(`/${userInfo?.Role}/allUsers`)}>
                                        all Users
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={() => navigate(`/${userInfo?.Role}/allbikes`)}>
                                        All bikes
                                    </button>
                                </li>

                            </ul>
                        </div>
                        :
                        userInfo?.Role === "user" ?
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <button className=' btn btn-outline-warning'
                                            onClick={() => navigate(`/${userInfo?.Role}`)}>
                                            Dashboard
                                        </button>
                                    </li>
                                    <li className=" mx-2 nav-item active">
                                        <button className=' btn btn-outline-warning'
                                            onClick={() => navigate(`/${userInfo?.Role}/allrerversations/${userInfo?._id}`)}>
                                            My reservations
                                        </button>
                                    </li>


                                </ul>

                            </div>
                            : ""

                }
            </nav>
        </>
    )
}

export default Navbar
