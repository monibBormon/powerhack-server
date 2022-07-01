// Basic 
const express = require('express')
const router = require('./src/routes/api')
const app = new express()
const bodyParser = require('body-parser')


// security middleware 
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const Xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')

// database 
const mongoose =require('mongoose')

// middleware implement 
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(Xss())
app.use(hpp())

// body parser implement 
app.use(bodyParser.json())

// request rate limit 
const limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Mongodb 
const URI ="mongodb+srv://<username>:<password>@cluster0.dejzn.mongodb.net/PowerHack?retryWrites=true&w=majority"
const OPTION = {user:"powerhack",pass:"S84ZhmhLlgXQPixS",autoIndex:true}
mongoose.connect(URI,OPTION,(err)=>{
    console.log("Mongo Connected");
    console.log(err);
})



// routing implement 
app.use('/api',router)


// undefined route 
app.use('*',(req,res)=>{
    res.status(404).json({status:"Fail",data:"Not Found"})
})


module.exports = app;