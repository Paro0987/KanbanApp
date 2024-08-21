const express=require('express');
const UserModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const BlacklistModel = require('../models/blacklist.model');
const Auth = require('../middlewares/Auth.middleware');
const dotenv = require("dotenv").config();

const userRoute=express.Router();

userRoute.post("/register",async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const user=await UserModel.findOne({email});

        if(user){
            return res.status(401).send('user already registered');
        }
        
        bcrypt.hash(password, 5,async function(err, hash) {
            if(err){
                console.log(`Error while bcrypting : ${err}`)
            }

            if(hash){
                const newUser=new UserModel({
                    name,email,password:hash,role
                })

                await newUser.save();
                res.status(200).json({
                    message:"User registered successfully",newUser
                })

            }
        });
  

        
    } catch (error) {
        res.status(404).send(`Error while registering ${error}`)
    }
});

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
       const user=await UserModel.findOne({email});
       if(!user){
        return res.status(401).send('wrong email or Email not found')
       }

       bcrypt.compare(password, user.password, function(err, result) {
      

        if(result){
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY);
            res.status(201).json({
                message:"User LoggedIn successfully" ,
                token
            })
        }
        else
        {
            res.status(402).json({
                message:"Wrong password" ,
                err
            })
        }
    });

    } catch (error) {
        res.status(404).send(`Error loggingIn ${error}`)
    }
});

userRoute.get("/logout",Auth,async(req,res)=>{
    try {
       const token=req.headers.authorization.split(" ")[1];

       const blacklistedToken=new BlacklistModel({
        blacklisttoken:token
       })

       await blacklistedToken.save();
       res.status(203).send("User logout successfully")
    } catch (error) {
       res.status(404).send(`Error loggingout ${error}`) 
    }

})

module.exports=userRoute