const express = require('express');
const { signup, signin, getuser, logout, updatUserProfile, updatUserPassword, deleteUser } = require('../controllers/user.controller');
const {signupDataValidate, jwtAuth, loginDataValidate} = require('../middleware/user.middleware');
const userRouter = express.Router();

userRouter.post('/signup', signupDataValidate, signup);
userRouter.post('/signin', loginDataValidate, signin);
userRouter.post('/user', jwtAuth, getuser);
userRouter.put('/updatUserProfile', jwtAuth, updatUserProfile);
userRouter.post('/updatUserPassword', jwtAuth, updatUserPassword);
userRouter.post('/deleteUser', jwtAuth, deleteUser);
userRouter.get('/logout', logout);

module.exports = userRouter