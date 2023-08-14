const todoModel = require("../model/todo.model");

const createTask = async (req,res,next)=>{
    const {task,userId} = req.body;
    if (!task || !userId) {
        return res.status(200).json({
            success: false,
            message:"All fields are required"
        })
    }
    const todos = await todoModel.create({todo: task, userId});
    // todos.save();

    return res.status(200).json({
        success: true,
        message:"Task Created"
    })
}

const getAllTodos = async (req,res,next)=>{
    const {userId} = req.body;
    const todos = await todoModel.find({userId});
    // todos.save();

    return res.status(200).json({
        success: true,
        message:"All todos",
        todos
    })
}

const deleteTask = async (req,res,next)=>{
    const {_id} = req.body;
    const todos = await todoModel.findByIdAndDelete({_id});
    // todos.save();

    return res.status(200).json({
        success: true,
        message:"Task deleted successfully",
    })
}
const updateTask = async (req,res,next)=>{
    const {todo, _id} = req.body;
    const todos = await todoModel.findByIdAndUpdate({_id},{todo});
    // todos.save();

    return res.status(200).json({
        success: true,
        message:"Task updated successfully"
    })
}

module.exports = {createTask, getAllTodos, deleteTask, updateTask}
