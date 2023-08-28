const express = require('express');
const {jwtAuth} = require('../middleware/user.middleware');
const { createTask, getAllTodos, deleteTask, updateTask, getPendingTasks, getcompletedTasks, updateStatus } = require('../controllers/todo.controller');
const todoRouter = express.Router();

todoRouter.post('/create', jwtAuth, createTask);
todoRouter.post('/allTodos', jwtAuth, getAllTodos);
todoRouter.post('/delete', jwtAuth, deleteTask);
todoRouter.put('/update', jwtAuth, updateTask);
todoRouter.post('/pending', jwtAuth, getPendingTasks);
todoRouter.post('/completed', jwtAuth, getcompletedTasks);
todoRouter.put('/status', jwtAuth, updateStatus);


module.exports = todoRouter