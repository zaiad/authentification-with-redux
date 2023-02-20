const express = require('express')
const app = express()
const cors = require("cors");
const bodyparser = require('body-parser')
require('dotenv').config()
require('./models')

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.urlencoded({ extended: true }))

// Data Base
require('./config/dbConfig')

// Routers
const authRouter = require('./routers/authRouter')
app.use('/api/auth', authRouter);
const userRouter = require('./routers/userRouter')
app.use('/api/user', userRouter);
app.all('*', (req, res) => {
    res.send(`Page not found`)
})

// Port
const port = process.env.PORT || 5001
app.listen(port, ()=> console.log(`Server run in port: ${port}`))
