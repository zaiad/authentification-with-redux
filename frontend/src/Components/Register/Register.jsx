import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './Register.css'
import { useDispatch } from 'react-redux';
import {register} from '../../actions/auth'


const Register = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setData({...data, [e.target.name] : value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        // const register = await axios.post('http://localhost:5000/api/auth/register', data)
        // .then(e => {
        //     if(e.data.message==="create success"){
        //         toast.success(e.data.message)
        //     }
        // }) .catch((error) => {
        //     toast.warning(error.response.data)
        // })
        dispatch(register(data))
    }


    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign Up</h3>
                <div className="form-group mt-3">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id='name'
                        onChange={handleChange}
                        className="form-control mt-1"
                        placeholder="Enter Name"
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        name='email'
                        id='email'
                        onChange={handleChange}
                        className="form-control mt-1"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name='password'
                        id='password'
                        onChange={handleChange}
                        className="form-control mt-1"
                        placeholder="Enter password"
                    />  
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" onClick={onSubmit} className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>
        <ToastContainer />
    </div>
    )
}

export default Register