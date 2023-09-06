const todoModel = require("../model/todo.model");

const createTask = async (req, res, next) => {
    try {
        const { task } = req.body;
        const { id } = req.user;
        if (!task) {
            return res.status(200).json({
                success: false,
                message: "All fields are required"
            })
        }
        await todoModel.create({ todo: task, userId: id });
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

        const { id } = req.user;
        const todos = await todoModel.find({ userId: id });

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

        const { id } = req.params;
        await todoModel.findByIdAndDelete({ _id: id });

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

        const pendingTodos = await todoModel.find({ completed: false, userId: req.user.id });

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

        const completedTodos = await todoModel.find({ completed: true, userId: req.user.id });

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
