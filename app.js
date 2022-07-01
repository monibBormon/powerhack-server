// Basic Lib Import
const express =require('express');
const router =require('./src/routes/api');
const app= new express();
const bodyParser =require('body-parser');

// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Mongodb 
const URI ="mongodb+srv://<username>:<password>@cluster0.dejzn.mongodb.net/PowerHack?retryWrites=true&w=majority"
const OPTION = {user:"powerhack",pass:"S84ZhmhLlgXQPixS",autoIndex:true}
mongoose.connect(URI,OPTION,(error)=>{
    console.log("Mongo Connected");
    console.log(error);
})



// routing implement 
app.use('/api',router)


// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})


module.exports = app;