const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    verification: Boolean
})

module.exports = mongoose.model('user', User)
