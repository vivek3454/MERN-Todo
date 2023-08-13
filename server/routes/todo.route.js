const express = require('express');
const {jwtAuth} = require('../middleware/user.middleware');
const { createTask } = require('../controllers/todo.controller');
const todoRouter = express.Router();

todoRouter.post('/create', jwtAuth, createTask);


module.exports = todoRouter