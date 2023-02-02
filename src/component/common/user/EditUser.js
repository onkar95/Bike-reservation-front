import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../layout/Loader/Loading';
import { getSingleUser, updateUser } from '../../../Redux/Actions/UserAction';

const EditUser = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { userInfo: user, singleUserInfo, loading, userUpdated } = useSelector(state => state.user)


    const [Edit, setEdit] = useState(true)
    let [name, setName] = useState()
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    let [Role, setRole] = useState()

    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')

    useEffect(() => {
        if (singleUserInfo.length === 0) dispatch(getSingleUser({ id }))
        console.log("first")
        setName(singleUserInfo?.name)
        setEmail(singleUserInfo?.email)
        setRole(singleUserInfo?.Role)
    }, [singleUserInfo, id]);



    const validate = () => {
        if (!name || !email || !Role) {
            alert("fill all details")
        } else if (name.length < 4) {
            // console.log("ne")
            setNameError("at least 4 characters are required")
            return false
        } else {
            return true;
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();

        if (validate()) {

            dispatch(updateUser({ id, name, email, Role }))

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

            {loading ? <Loading /> :
                <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8">
                        <h4 className="text-muted text-center mb-5">Create an account </h4>

                        <div className="card p-5 shadow">

                            <button onClick={handleEdit}>Edit</button>
                            {user?.Role === "manager" ? <div className="form-group mx-2">
                                <input disabled={Edit} className="form-group mx-2" type="radio" value="user" id="role" name="role" checked={Role === "user" ? true : false} onChange={(e) => setRole(e.target.value)} />
                                <label >user</label>
                                <input disabled={Edit} className="form-group mx-2" type="radio" value="manager" id="rol1" name="role" checked={Role === "manager" ? true : false} onChange={(e) => setRole(e.target.value)} />
                                <label >admin</label>
                            </div> : ""}
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
                                {/* <div className="form-group mt-2">
                                <label htmlFor="password" >Password</label>
                                <input disabled={Edit} type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                            </div>
                            <div className="alert-danger">
                                {passwordError}
                            </div> */}

                                <button className="btn btn-primary btn-block my-3" disabled={Edit} onClick={handleSubmit}>Save</button>
                            </form>

                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>
            }
        </div>
    )
}

export default EditUser