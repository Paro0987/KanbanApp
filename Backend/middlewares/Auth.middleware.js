const jwt=require('jsonwebtoken');
const BlacklistModel = require('../models/blacklist.model');
const UserModel = require('../models/user.model');
const dotenv=require('dotenv').config();

const Auth=async(req,res,next)=>{
   if(!req.headers.authorization){
      return (
         console.log("Token not found")
      )
   }

 const token=req.headers.authorization.split(" ")[1];

 const blacklistedToken=await BlacklistModel.findOne({
    blacklisttoken:token
 })

 if(blacklistedToken){
    return res.status(402).send('You are logged out ,Please login again')
 }

 jwt.verify(token, process.env.SECRET_KEY,async function(err, decoded) {
     
    
    if(decoded){
        const user=await UserModel.findById(decoded.id)
        req.user=user
        next()
      }
      else{
        console.log(err)
      }
  });

}

module.exports=Auth