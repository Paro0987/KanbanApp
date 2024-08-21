const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","in-Progress","completed"],
        default:"pending"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{
    versionKey:false,
    timestamps:true
})

const TaskModel=mongoose.model("task",taskSchema)

module.exports=TaskModel