import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DataContext, { UserContext } from '../context/UserContext';

const EditUser = () => {
    const { id } = useParams()
    const { user, setUser } = useContext(DataContext);
    const [Edit, setEdit] = useState(true)
    const navigate = useNavigate();

    let [name, setName] = useState()
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    let [Role, setRole] = useState()

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`https://server-bike.herokuapp.com/auth/Singleuser/${id}`)
                .then((res) => {
                    setName(res.data.name)
                    setEmail(res.data.email)
                    setRole(res.data?.Role)
                })
                .catch(err => console.log(err));

        }
        fetchData();

    }, [, id]);

    const logout = () => {
        setUser(null)
        localStorage.removeItem('token')
        navigate("/login");
    };
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
        setEmailError('');
        setNameError('');
        setPasswordError('');

        console.log(name, email, password, Role)
        try {
            const dataobj = {
                name, email, password, Role
            }
            if (validate()) {

                await axios.put(`https://server-bike.herokuapp.com/auth/updateUser/${id}`, dataobj)
                    .then((data) => {
                        console.log(data);
                        // setData(data.data)
                        if (data?.data?.Role === "manager") {
                            logout()
                        }
                    })
                    .catch(err => {
                        console.log("err 123", err)
                        setEmailError(err.response.data.email);
                        setPasswordError(err.response.data.password);
                    });
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleEdit = () => {
        if (Edit === false) {
            setEdit(true);
        } else {
            setEdit(false);
        }
    }


    return (
        <div>
            <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm-8">
                    <h4 className="text-muted text-center mb-5">Create an account </h4>
                    {/* {
                        user?.Role === "manager" ?
                            <>
                                <button onClick={() => navigate(`/allrerversations/${OldData?._id}`)}>see Reservations by {OldData?.name}</button>
                            </>
                            : ""
                    } */}
                    <div className="card p-5 shadow">

                        <button onClick={handleEdit}>Edit</button>
                      {  user?.Role === "manager" ? <div className="form-group mx-2">
                            <input disabled={Edit} className="form-group mx-2" type="radio" value="user" id="role" name="role" checked={Role === "user" ? true : false} onChange={(e) => setRole(e.target.value)} />
                            <label >user</label>
                            <input disabled={Edit} className="form-group mx-2" type="radio" value="manager" id="rol1" name="role" checked={Role === "manager" ? true : false} onChange={(e) => setRole(e.target.value)} />
                            <label >admin</label>
                        </div>:""}
                        <form >
                            <div className="form-group mt-2">
                                <label htmlFor="name" > Enter your name </label>
                                <input disabled={Edit} type="name" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} name='name' />
                            </div>
                            <div className="alert-danger">
                                {nameError}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="email" >Email address</label>
                                <input disabled={Edit} type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="alert-danger">
                                {emailError}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" >Password</label>
                                <input disabled={Edit} type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                            </div>
                            <div className="alert-danger">
                                {passwordError}
                            </div>

                            <button className="btn btn-primary btn-block my-3" disabled={Edit} onClick={handleSubmit}>Save</button>
                        </form>

                    </div>
                </div>
                <div className="col-sm-2" />
            </div>
        </div>
    )
}

export default EditUser