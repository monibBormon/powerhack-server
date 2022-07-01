const mongoose= require('mongoose')

const DataSchema = mongoose.Schema({
    FullName:{type:String},
    Email:{type:String},
    EmailAddress:{type:String},
    Phone:{type:String},
    Amount:{type:Number}

},{versionKey:false})

const BillModel = mongoose.model('bills',DataSchema)

module.exports= BillModel;