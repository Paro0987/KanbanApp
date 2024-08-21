const mongoose=require('mongoose');
const dotenv=require('dotenv').config();

const URL=process.env.MONGO_URL;

const connection=mongoose.connect(URL)

module.exports=connection