const express = require('express');
const { register, login, profile, getUser, addContact, getContacts, addMessage, getAllMesssage } = require('../Controllers/userController');
const userRouter = express.Router();

userRouter.route('/register')
    .post(register)
userRouter.route('/login')
    .post(login)
    .get(profile)
userRouter.route('/det')
    .get(getUser)
userRouter.route('/addcontact')
    .post(addContact)
userRouter.route('/getcontacts')
    .post(getContacts)
userRouter.route('/addmessage')
    .post(addMessage)
userRouter.route('/getmessage')
    .post(getAllMesssage)
module.exports = userRouter;