import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask = async (req,res,next)=>{
    try {
        const {title, description} = req.body;
        await Task.create({
            title,
            description,
            user: req.user  
        })
    
        res.status(201).json({
            success: true,
            message: "New task added successfully!"
        })
        
    } catch (error) {
        next(error);
        
    }

}

export const getMyTask = async (req,res,next)=>{
     
    try {
        const userid = req.user._id;
        let task = await Task.find({user: userid});
   
        if(!task){
           return res.status(404).json({
               success: false,
               message: "No task found!"
           })
       }
   
       res.status(200).json({
           success: true,
           task
       })
        
    } catch (error) {
        next(error);
    }

};

export const updateTask = async (req,res,next)=>{
   try {
    const {id} = req.params;
    const task = await Task.findById(id);
 
    if(!task) return next(new errorHandler("Task not found",404));
    task.isCompleted = !task.isCompleted ;
    await task.save();
     
     res.status(200).json({
     success: true,
     message: "Task updated successfully!"
    })
    
   } catch (error) {
        next(error);
   }

};

export const deleteTask = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
    
        if(!task) return next(new errorHandler("Task not found",404));
        await task.deleteOne();
    
        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        });
        
    } catch (error) {
        next(error);
    }

};