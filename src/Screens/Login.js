import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../layout/Loader/Loading';
import Navbar from '../layout/navbar/Navbar';
import { userLogin } from '../Redux/Actions/AuthActions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo, error, userToken, loading, verified } = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin({ email, password }))
    }


    useEffect(() => {
        console.log(userInfo)
        if (userInfo?.Role !== undefined) {
            return navigate(`/${userInfo?.Role}`)
        }
    }, [userInfo, userToken, verified]);


    return (
        <>
            {
                loading ? <Loading /> :
                    <>

                        <Navbar />
                        <div className="row my-4 w-100">
                            <div className="col-sm-2" />
                            <div className="col-sm-8">
                                <div className="card p-5 shadow">
                                    <form >
                                        <h3>Log in</h3>
                                        <div className="form-group mt-2">
                                            <label htmlFor="email" >Email address</label>
                                            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' />
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>
                                        <div className="alert-danger">
                                            {error}
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="password" >Password</label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                                        </div>
                                        <div className="alert-danger">
                                            {error}
                                        </div>

                                        <button disabled={!email || !password} className="btn btn-primary btn-block my-3" onClick={submitHandler}>Login</button>
                                    </form>
                                    <button onClick={() => navigate('/register')} className="btn btn-primary w-25">create account here</button>
                                </div>
                            </div>
                            <div className="col-sm-2" />
                        </div>
                    </>
            }

        </>

    )
}

export default Login

