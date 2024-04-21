const express = require('express');
const { createMarket, getAllMarket, marketItemDetails, getUserMarket, removeMarket } = require('../Controllers/marketContoller');
const marketRouter = express.Router();

marketRouter.route('/create')
    .post(createMarket)
marketRouter.route('/getAllMarket')
    .post(getAllMarket)
marketRouter.route('/getUserMarket')
    .post(getUserMarket)
marketRouter.route('/deleteMarket/:marketId')
    .delete(removeMarket)
marketRouter.route('/getMarketItem')
    .post(marketItemDetails)
module.exports = marketRouter;