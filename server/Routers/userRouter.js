const express = require('express');
const { register, login, profile } = require('../Controllers/userController');
const userRouter = express.Router();

userRouter.route('/register')
    .post(register)
userRouter.route('/login')
    .post(login)
    .get(profile)
module.exports = userRouter;