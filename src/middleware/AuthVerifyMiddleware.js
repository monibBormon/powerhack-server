const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{

    const Token = req.headers['token']

    jwt.verify(Token,"secretKey123",function(err,decoded){
        if(err){
            res.status(401).json({status:"unAuthorized"})
        }else{

            // Get Email from decoded token and add with req header
            const email = decoded['data']['EmailAddress']
            req.headers.EmailAddress = email

            next()
        }
    })
}