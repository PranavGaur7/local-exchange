const express = require('express');
const { register, login, profile, getUser } = require('../Controllers/userController');
const userRouter = express.Router();

userRouter.route('/register')
    .post(register)
userRouter.route('/login')
    .post(login)
    .get(profile)
userRouter.route('/det')
    .get(getUser)
module.exports = userRouter;