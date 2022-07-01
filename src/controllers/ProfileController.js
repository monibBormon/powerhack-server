const ProfileModel = require("../models/ProfileModel");
const jwt = require('jsonwebtoken')

exports.registration=(req, res)=>{
    let reqBody=req.body
    ProfileModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}


exports.UserLogin =(req,res)=>{
    const EmailAddress  = req.body['EmailAddress'];
    const password  = req.body['Password'];

    ProfileModel.find({EmailAddress:EmailAddress,Password:password},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }else{
            if(data.length>0){

                const payload = {expiresIn: "30d",data:data[0]}
                const token = jwt.sign(payload,"secretKey123")

                res.status(200).json({status:"success",token,data:data[0]})
            }else{
                res.status(401).json({status:"unAuthorized"})
            }
        }
    })
}
