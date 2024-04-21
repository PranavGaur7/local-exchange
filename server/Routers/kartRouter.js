const express = require('express');
const { createKart, removeKart, getUserKart } = require('../Controllers/kartController');
const kartRouter = express.Router();

kartRouter.route('/create')
    .post(createKart)
kartRouter.route('/delete')
    .post(removeKart)
kartRouter.route('/userKart')
    .get(getUserKart)
    
module.exports = kartRouter;