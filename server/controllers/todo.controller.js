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

module.exports = {createTask}
