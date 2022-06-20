/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataContext from '../context/UserContext';
import "bootstrap/dist/css/bootstrap.min.css"

const Navbar = () => {
    const { user, setUser } = useContext(DataContext);
    const navigate = useNavigate();
    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        navigate("/login");
    };
    const [Disabled, setDisabled] = useState(true)
    useEffect(() => {
        if (!user) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [user])
    return (
        <>


            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <a className="navbar-brand " href='#' style={{ color: "white" }}>Rent A bike</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!user ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <button className=' mx-3  btn btn-outline-primary' disabled={Disabled} onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className=' mx-3  btn btn-outline-primary' disabled={Disabled} onClick={() => navigate('/register')}>
                                    Register
                                </button>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={logout}>
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
                    user?.Role === "manager" ?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <button className=' btn btn-outline-warning' onClick={() => navigate('/allUsers')}>
                                        {/* {user?.ShopId?.length !== 0 ? " Add another Restaurant" : "Register Your Restaurant here"} */}
                                        all Users
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button className='mx-3 btn btn-outline-danger' disabled={!Disabled} onClick={() => navigate('/allbikes')}>
                                        All bikes
                                    </button>
                                </li>

                            </ul>
                        </div>
                        :
                        user?.Role === "user" ?
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <button className=' btn btn-outline-warning' onClick={() =>
                                            navigate(`/`)}>
                                            Dashboard
                                        </button>
                                    </li>
                                    <li className=" mx-2 nav-item active">
                                        <button className=' btn btn-outline-warning' onClick={() =>
                                            navigate(`/allrerversations/${user?._id}`)}>
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
