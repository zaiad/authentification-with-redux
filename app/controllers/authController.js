const db = require('../models')
const jwt = require('jsonwebtoken')
const ls = require('local-storage')
const bcrypt = require('bcryptjs')
const mailer = require('../middlewares/mailer')
const { findOne } = require('../models/userModel')
const saltRounds = 10

const User = db.user
const Role = db.role

const register = async (req, res)=>{
    const {body} = req
    if(body.name == '' || body.email == '' || body.password == '')
        res.status(401).send('Fill all fields')
    const findEmail = await User.findOne({email: body.email})
    if(findEmail) res.status(401).send('Email already Exist')
        const passwordHashed = await bcrypt.hash(body.password, saltRounds)
        const user = await User.create({
            ...body, password:passwordHashed, roles: '6370e919e434a368ee52969c' , verification: false
        })
        if (user) {
            // mailer.main('verify-email', body.email)
            res.json({message: 'create success'})
        }
        if (!user) res.send('user')
}

const login = async (req, res) => {
    const {body} = req
    if(body.email == '' || body.password == '') res.status(401).send ('Fill all fields')
    const login_user = await User.findOne({email: body.email})
    if(!login_user || !(await bcrypt.compare(body.password, login_user.password)))
    res.status(401).send('Email Or Password is incorect')
    res.json({message: 'login success'})
    const login_role = await Role.findById(login_user.roles)

    
}

const verifyEmail = async (req, res) => {
    const verify_email = await jwt.verify(req.params.token, process.env.TOKEN_KEY)
    const verify_user = await User.findOne({email: verify_email.email})
    if(verify_user.verification) throw Error('Your account is already actived')
    const verification_email = await User.updateOne({email: verify_email.email}, {$set: {verification: true}})
    if(verification_email) res.send('Your  account is actived')
    if(!verification_email) throw Error("You can't to active your account")
}

const resetPassword = async (req, res) => {
    const {body} = req
    if(body.last_password == '' || body.new_password == '' || body.new_password != body.confirm_new_password)
        throw Error ('Fill the all fields to reset your password')
        const token_reset = ls('token')
        const user_reset = await jwt.verify(token_reset, process.env.TOKEN_KEY)
        const find_user_reset = await User.findById(user_reset.id)
        const verify_last_password = await bcrypt.compare(body.last_password, find_user_reset.password)
        if(!verify_last_password) throw Error ('your password is incorrect')
        const hash_new_password = await bcrypt.hash(body.new_password, saltRounds)
        const update_reset_password = await User.updateOne({_id: find_user_reset._id}, {$set: {password: hash_new_password}})
        res.send('your password is changing')
}


const forgetPassword = async (req, res) => {
    const email = req.body.email
    if(email == '') throw Error ('Enter Your Email')
    const forget_password_email = await User.findOne({email: email})
    if(!forget_password_email) throw Error('User Not Found')
    mailer.main('verify-forget-password', email)
    res.send('Check your email')

}

const verifyForgetPassword = async (req, res) => {
    const token = req.params.token
    const verify_token = await jwt.verify(token, process.env.TOKEN_KEY)
    const verify_token_email = await User.findOne({email: verify_token.email})
    const new_token = await jwt.sign({id: verify_token_email._id}, process.env.TOKEN_KEY)
    res.json({message: 'form forget password', token: new_token})
}

const formForgetPassword = async (req, res) => {
    const {body} = req
    if(body.token == '' || body.password == '' || body.confirm_password != body.password) throw Error ('fill all your fields for changing your password')
    const verify_form_token = await jwt.verify(body.token, process.env.TOKEN_KEY)
    const find_forget_user = await User.findById(verify_form_token.id)
    if(!find_forget_user) throw Error ('Error, User not found')
    const passwordHashed_forget = await bcrypt.hash(body.password, saltRounds )
    const update_form_password = await User.updateOne({_id: find_forget_user._id}, {$set: {password: passwordHashed_forget}})
    res.send('your password is changed')
}


const logOut = async (req, res) => {
    ls.clear();
    res.send('your log out')
}




module.exports = {
    register,
    verifyEmail,
    login,
    forgetPassword,
    verifyForgetPassword,
    formForgetPassword,
    resetPassword,
    logOut,
}