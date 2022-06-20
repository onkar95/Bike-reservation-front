import React, { useState, useContext } from 'react'

import { Link, Navigate, useNavigate } from 'react-router-dom';
import DataContext from '../context/UserContext';
// import * as faker from 'faker';

const Login = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(DataContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    console.log("email", email)

    const submitHandler = async e => {

        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        try {
            const res = await fetch(`https://server-bike.herokuapp.com/auth/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log("data", data);
            if (data) {
                console.log("data error", data.email)
                setEmailError(data.email);
                setPasswordError(data.password);

            }
            if (data.user) {
                setUser(data.user)
                localStorage.setItem("token", data.token);
            }

        } catch (error) {
            console.log("error", error)
        }
    }
    const Util = {
        sleep: (millis) => new Promise((resolve => setTimeout(resolve, millis)))
    }
    //    const fetchLoggedInUserDetails = async () => {
    //         console.log(`Fetching user details`);
    //         await Util.sleep(2000)
    //         // 20% of the time the function will throw error
    //         if (Math.random() < 0.20) {
    //             console.log(`Fetching user details Failed`)
    //             throw new Error("Unable to fetch logged in user details");
    //         }

    //         // 50% of the time logged in user details would be admin and 50% of time his role will be regular

    //         const user = {
    //             name: faker.name.findName(),
    //             email: faker.internet.email(),
    //             role: Math.random() > 0.5 ? 'user' : 'admin'
    //         }
    //         console.log(`Fetching user details Successful`, {user})
    //         return user;
    //     }

    console.log(user);
    if (user) {
        return <Navigate to='/' />
    }

    return (
        <React.Fragment>
            <Link to="/">back</Link>
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

                            <button disabled={!email} className="btn btn-primary btn-block my-3" onClick={submitHandler}>Login</button>
                        </form>
                        <button onClick={() => navigate('/register')} className="btn btn-primary w-25">create account here</button>
                    </div>
                </div>
                <div className="col-sm-2" />
            </div>

        </React.Fragment>

    )
}

export default Login

