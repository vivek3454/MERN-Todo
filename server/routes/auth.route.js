const express = require('express');
const { signup, signin, getuser, logout, updatUserProfile } = require('../controllers/user.controller');
const {signupDataValidate, jwtAuth, loginDataValidate} = require('../middleware/user.middleware');
const userRouter = express.Router();

userRouter.post('/signup', signupDataValidate, signup);
userRouter.post('/signin', loginDataValidate, signin);
userRouter.post('/user', jwtAuth, getuser);
userRouter.post('/updatUserProfile', jwtAuth, updatUserProfile);
userRouter.get('/logout', logout);

module.exports = userRouter