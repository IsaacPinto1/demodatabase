const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    name: String,
    pw: String,
    color: String
})

const userData = mongoose.connection.useDb('userData') // Can connect to specific database
const testModel = userData.model("test33", testSchema)
module.exports = testModel