const express = require('express');
const {jwtAuth} = require('../middleware/user.middleware');
const { createTask, getAllTodos, deleteTask, updateTask, getPendingTask, getPendingTasks, getcompletedTasks } = require('../controllers/todo.controller');
const todoRouter = express.Router();

todoRouter.post('/create', jwtAuth, createTask);
todoRouter.post('/allTodos', jwtAuth, getAllTodos);
todoRouter.post('/delete', jwtAuth, deleteTask);
todoRouter.post('/update', jwtAuth, updateTask);
todoRouter.post('/pending', jwtAuth, getPendingTasks);
todoRouter.post('/completed', jwtAuth, getcompletedTasks);


module.exports = todoRouter