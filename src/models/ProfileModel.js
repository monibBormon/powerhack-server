const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    EmailAddress:{type:String},
    MobileNumber:{type:String},
    Password:{type:String}

},{versionKey:false})

const ProfileModel = mongoose.model('users',DataSchema)

module.exports = ProfileModel;