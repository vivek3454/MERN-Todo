const todoModel = require("../model/todo.model");

const createTask = async (req, res, next) => {
    try {
        const { task, userId } = req.body;
        if (!task || !userId) {
            return res.status(200).json({
                success: false,
                message: "All fields are required"
            })
        }
        const todos = await todoModel.create({ todo: task, userId });
        return res.status(200).json({
            success: true,
            message:"Task created successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const getAllTodos = async (req, res, next) => {
    try {

        const { userId } = req.body;
        const todos = await todoModel.find({ userId });

        return res.status(200).json({
            success: true,
            message: "All todos",
            todos
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const deleteTask = async (req, res, next) => {
    try {

        const { _id } = req.body;
        const todos = await todoModel.findByIdAndDelete({ _id });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}
const updateTask = async (req, res, next) => {
    try {

        const { todo, _id } = req.body;
        const todos = await todoModel.findByIdAndUpdate({ _id }, { todo });

        return res.status(200).json({
            success: true,
            message: "Task updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const getPendingTasks = async (req, res, next) => {
    try {

        const pendingTodos = await todoModel.find({ completed: false });

        return res.status(200).json({
            success: true,
            message: "All Pending Tasks",
            pendingTodos
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}
const getcompletedTasks = async (req, res, next) => {
    try {

        const completedTodos = await todoModel.find({ completed: true });

        return res.status(200).json({
            success: true,
            message: "All Completed Tasks",
            completedTodos
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const updateStatus = async (req, res, next) => {
    try {

        const { _id, completed } = req.body;
        if (completed) {
            await todoModel.findByIdAndUpdate({ _id }, { completed: true });
            return res.status(200).json({
                success: true,
                message: "Mark as Completed Tasks"
            })
        }
        else {
            await todoModel.findByIdAndUpdate({ _id }, { completed: false });
            return res.status(200).json({
                success: true,
                message: "Mark as Pending Tasks"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }

}

module.exports = { createTask, getAllTodos, deleteTask, updateTask, getPendingTasks, getcompletedTasks, updateStatus }
