const mongoose=require('mongoose');

const blacklistSchema=new mongoose.Schema({
    blacklisttoken:String
},{
    versionKey:false,
    timestamps:true
});

const BlacklistModel=mongoose.model("blacklistToken",blacklistSchema);

module.exports=BlacklistModel