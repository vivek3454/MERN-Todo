const express = require('express');
const {jwtAuth} = require('../middleware/user.middleware');
const { createTask, getAllTodos, deleteTask, updateTask, getPendingTasks, getcompletedTasks, updateStatus } = require('../controllers/todo.controller');
const todoRouter = express.Router();

todoRouter.post('/create', jwtAuth, createTask);
todoRouter.get('/allTodos', jwtAuth, getAllTodos);
todoRouter.delete('/delete/:id', jwtAuth, deleteTask);
todoRouter.put('/update', jwtAuth, updateTask);
todoRouter.get('/pending', jwtAuth, getPendingTasks);
todoRouter.get('/completed', jwtAuth, getcompletedTasks);
todoRouter.put('/status', jwtAuth, updateStatus);


module.exports = todoRouter