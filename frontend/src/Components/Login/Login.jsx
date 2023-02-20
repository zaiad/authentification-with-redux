import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'
import {login} from '../../actions/auth'


const Login = () => {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setData({...data, [e.target.name]: value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        // const login = await axios.post('http://localhost:5000/api/auth/login', log)
        // .then(e => {
        //     if(e.data.message === 'login success') {
        //         toast.success(e.data.message)
        //     }
        // }).catch((error) => {
        //     toast.warning(error.response.data)
        // })

        dispatch(login(data))

    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            name='email'
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
                    <p className="forgot-password text-right mt-2">
                    Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login