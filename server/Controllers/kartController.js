const kartModel = require("../Models/kartModel");
const marketModel = require("../Models/marketModel");
const jwt = require('jsonwebtoken')
module.exports.createKart = async (req, res) => {
    const uid = req.header('auth-token');
    const { kartDetails } = req.body;
    const market = await marketModel.findOne({ _id: kartDetails })
    try {

        if (market) {
            let kart = await kartModel.findOne({
                user: uid
            })
            if (kart) {

                kart.kartDetails.push(market)
                kart.save()
            }
            else {

                kart = await kartModel.create({
                    user: uid,
                    kartDetails: [market]
                })
            }
            res.status(200).json({
                msg: "kart pushed",
                market: market
            })
        }
        else {
            res.json({
                msg: "this market does not exist"
            })
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports.removeKart = async (req, res) => {
    const token = req.header('auth-token');
    const { kartDetails } = req.body;
    const kart = await kartModel.findOne({
        user: token
    })
    try {

        if (kart) { 
            const filterdData = kart.kartDetails.filter(element => {
                return element._id.toString() !== kartDetails.toString()
            }
            )
            kart.kartDetails = filterdData
            kart.save()
            res.status(200).json({
                msg: "kart deleted",
                data: filterdData
            })
        }
        else {
            res.json({
                msg: "this kart does not exist in the kart"
            })
        }
    } catch (error) {
        return res.json(error)
    }
}

module.exports.getUserKart = async (req, res) => {
    const token = req.header('auth-token');
    const uid = jwt.verify(token, process.env.JWT_KEY).payload;
    try {

        const kartData = await kartModel.findOne({ user: uid })
        if (kartData) {
            res.status(200).json({
                kartData
            })
        }
        else {
            res.json({
                msg: "no such kart exist"
            })
        }
    } catch (error) {
        return res.json(error)
    }
} 