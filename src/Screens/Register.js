/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from "react";

import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import DataContext from "../component/context/UserContext";
// import { stringify } from "querystring";
// import { Link, Navigate } from "react-router-dom";


const Register = () => {
    const { user } = useContext(DataContext);

    const [, setData] = useState()
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Role, setRole] = useState()

    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")


    useEffect(() => {
        setEmailError("")
        setNameError("")
        setPasswordError("")
    }, [email, name, password]);
    const validate = () => {

        if (!name || !email || !password || !Role) {
            alert("fill all details")
        } else if (name.length < 4) {
            // console.log("ne")
            setNameError("at least 4 characters are required")
            return false
        } else if (password.length < 8) {
            setPasswordError("password must be of 8 degits");
            return false
        } else {
            return true;
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("reg")
        setEmailError('');
        setNameError('');
        setPasswordError('');
        console.log(name, email, password, Role)
        try {
            const dataobj = {
                name, email, password, Role
            }
            if (validate()) {
                await axios.post('http://localhost:5000/auth/register', dataobj)
                    .then((data) => {
                        console.log(data);
                        setData(data.data)
                        navigate('/login')
                        console.log("err 123", data.email)
                    })
                    .catch(err => {
                        console.log("err 123", err)
                        console.log("data error", err.response.data.email)
                        setEmailError(err.response.data.email);
                        setPasswordError(err.response.data.password);


                    });
            }
            //  else {
            //     alert("fill all the details properly")
            // }

        } catch (error) {
            console.log(error)
        }


    }
    return (
        <>

            <div>

                <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8">
                        <h4 className="text-muted text-center mb-5">Create an account </h4>

                        <div className="card p-5 shadow">
                            <div className="form-group mx-2">
                                <input className="form-group mx-2" type="radio" value="user" name="role" checked={Role === "user"} onChange={e => setRole(e.target.value)} />
                                <label >user</label>
                                <input className="form-group mx-2" type="radio" value="manager" name="role" onChange={e => setRole(e.target.value)} />
                                <label >admin</label>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name" > Enter your name </label>
                                    <input type="name" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} name='name' />
                                </div>
                                <div className="alert-danger">
                                    {nameError.length > 0 ? nameError : ""}
                                </div>
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

                                {!user ?
                                    <>
                                        <button className=" w-25 btn btn-primary btn-block my-3" >Register</button>
                                        <button onClick={() => navigate('/login')} className="btn btn-primary  w-25 btn-block">Login</button>
                                    </>
                                    :
                                    <button className="btn btn-primary btn-block my-3" >add USer</button>
                                }

                            </form>

                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>

            </div>
        </>
    )
}

export default Register


