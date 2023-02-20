import axios from 'axios'
const API_URL = 'http://localhost:5000/api/auth'

export const register = (data) => (dispatch) => {
    axios.post(`${API_URL}/register`, data)
    .then(e => {
        if(e.data.message==="create success"){
            const data = JSON.stringify(e.data)
            localStorage.setItem('register', data)

            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: data
            })
        }
    }) .catch((error) => {
        dispatch({
            type: 'REGISTER_FAIL'
        })
    })
}

export const login = (data) => (dispatch) => {
    axios.post(`${API_URL}/login`, data)
    .then(e => {
        if(e.data.message === 'login success') {
            const data = JSON.stringify(e.data)
            localStorage.setItem('login', data)

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: data
            })
        }
    }).catch((error) => {
        dispatch({
            type: 'LOGIN_FAIL'
        })
    })
}