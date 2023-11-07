const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    pw: String,
    color: String,
    count: Number
})

const UserModel = mongoose.model("logins", UserSchema) // logins is name of table in DB
module.exports = UserModel

