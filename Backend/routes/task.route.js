const express=require('express');
const TaskModel = require('../models/task.model');
const Authorize = require('../middlewares/Authorize.middleware');

const taskRoute=express.Router();

taskRoute.post("/create-task",Authorize(["user"]),async(req,res)=>{
    const {title,status}=req.body;
    const userID=req.user.id;
    try {
        const task=new TaskModel({
            title,status,userId:userID
        })

        await task.save();
        res.status(201).json({
            message:"Task added successfully",task
        })
    } catch (error) {
        res.status(404).send(`Error while adding task ${error}`)
    }

})

taskRoute.get("/get-tasks",Authorize(["user"]),async(req,res)=>{
   const userId=req.user.id
   
    try {
        const task=await TaskModel.find({userId});
        res.status(202).json({
            message:"Task of user retrieved successfully",
            task
        }) 
    } catch (error) {
        res.status(404).send(`Error while retrieving tasks ${error}`)
    }

})

taskRoute.get("/get-Alltasks",Authorize(["admin"]),async(req,res)=>{
    
    
     try {
         const task=await TaskModel.find();
         res.status(202).json({
             message:"All Task retrieved successfully",
             task
         }) 
     } catch (error) {
         res.status(404).send(`Error while retrieving tasks ${error}`)
     }
 
 })

 taskRoute.patch("/update-task/:id",Authorize(["user"]),async(req,res)=>{
    const payload=req.body;
    const taskId=req.params.id;
    const userId=req.user.id
    
    try {
        const task=await TaskModel.findOne({_id:taskId})

        if(task.userId.toString()===userId.toString()){
           await TaskModel.findByIdAndUpdate({_id:taskId},payload)
        }
        res.status(204).json({
            message:"Updated task"
        })
      
    } catch (error) {
        res.status(404).send(`Error while updating task ${error}`)
    }
 })

 taskRoute.delete("/delete-task/:id",Authorize(["admin","user"]),async(req,res)=>{
    
    const taskId=req.params.id;
    const userId=req.user.id
    
    try {
        const task=await TaskModel.findOne({_id:taskId})

        if(task.userId.toString()===userId.toString()){
           await TaskModel.findByIdAndDelete({_id:taskId})
        }
        res.status(205).json({
            message:"deleted task"
        })
      
    } catch (error) {
        res.status(404).send(`Error while deleting task ${error}`)
    }
 })

module.exports=taskRoute;