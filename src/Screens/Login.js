import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser, userLogin } from '../Redux/Actions/AuthActions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo, error } = useSelector(state => state.user)
    console.log(error)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    useEffect(() => {
        return () => {
            setPasswordError('')
            setEmailError('')
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin({ email, password }))
    }

    console.log(error);
    useEffect(() => {
        if (userInfo?.length !== 0) return navigate(`/${userInfo?.user.Role}`)
    }, [userInfo]);


    return (
        <>
            <div className="row my-4">
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
                                {emailError}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" >Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                            </div>
                            <div className="alert-danger">
                                {passwordError}
                            </div>

                            <button disabled={!email || !password} className="btn btn-primary btn-block my-3" onClick={submitHandler}>Login</button>
                        </form>
                        <button onClick={() => navigate('/register')} className="btn btn-primary w-25">create account here</button>
                    </div>
                </div>
                <div className="col-sm-2" />
            </div>

        </>

    )
}

export default Login

