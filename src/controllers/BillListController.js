const BillModel = require("../models/BillModel");


exports.CreateBill=(req,res)=>{
    const EmailAddress = req.headers['EmailAddress']
    const email = req.body['Email']
    const phone = req.body['Phone']
    const fullName = req.body['FullName']
    const amount = req.body['Amount']

    const body={
        EmailAddress:EmailAddress,
        FullName:fullName,
        Email:email,
        Phone:phone,
        Amount:amount
    }
    // console.log(EmailAddress,body);
    BillModel.create(body,(err,data)=>{
        console.log(data);
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })
}


// read data 
exports.SelectBill=(req,res)=>{
    const email = req.headers['EmailAddress']
    BillModel.aggregate([
        {$match:{EmailAddress:email}},
        {$project:{
                _id:1,FullName:1,Email:1, Phone:1,Amount:1,EmailAddress:1
                
            }},
        {$group:{_id:"$EmailAddress",total:{$sum:"$Amount"}}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// Get Data  bY id
exports.ReadById=(req,res)=>{
    const id = req.params.id 
    const Query = {_id:id}

    BillModel.find(Query,(err,data)=>{
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })
}


exports.UpdateBill=(req,res)=>{
    const id = req.params.id 
    const Query = {_id:id}
    const body =req.body;
    BillModel.updateOne(Query,body,(err,data)=>{
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })
}


// Delete 
exports.DeleteBill=(req,res)=>{
    const id = req.params.id 
    const Query = {_id:id}
    BillModel.remove(Query,(err,data)=>{
        if(err){
            res.status(400).json({status:'fail',data:err})
        }else{
            res.status(200).json({status:'success',data:data})
        }
    })
}

// Count Total 
exports.AmountCount=(req,res)=>{
    let email=req.headers['EmailAddress'];
    BillModel.aggregate([
        {$match:{EmailAddress:email}},
        {$group:{_id:"$EmailAddress",total:{$sum:"$Amount"}}}
    ], (err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}