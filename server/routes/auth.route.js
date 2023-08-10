const express = require('express');
const { signup, signin, getuser, logout } = require('../controllers/user.controller');
const {signupDataValidate, jwtAuth, loginDataValidate} = require('../middleware/user.middleware');
const userRouter = express.Router();

userRouter.post('/signup', signupDataValidate, signup);
userRouter.post('/signin', loginDataValidate, signin);
userRouter.get('/user', jwtAuth, getuser);
userRouter.get('/logout', logout);

module.exports = userRouter