const marketModel = require("../Models/marketModel");
const jwt = require("jsonwebtoken")
module.exports.createMarket = async function createMarket(req, res) {
    const data = req.body;
    try {
        const market = await marketModel.create(data);
        if (market) {
            res.status(200).json({
                msg: "market created",
                market: market
            })
        }
        else {
            res.json({
                msg: "unable to create market"
            })
        }
    } catch (error) {
        res.json(error)
    }

}

module.exports.getAllMarket = async (req, res) => {
    const data = req.body
    let filters = {}
    if (data.category !== "All Categories") {
        filters.category = data.category
    }
    if (data.role !== "None") {
        filters.role = data.role
    }
    // filters.user = data.user
    try {
        let response = await marketModel.find();

        response = await response.filter(product => {
            for (const key in filters) {
                if (filters[key] !== product[key]) {
                    return false;
                }
            }
            return true;
        });

        response = await response.filter(item => data.user !== item.user.toString())



        // Sort locations based on distance from given latitude and longitude
        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2 - lat1);
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in km
            return distance;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }

        // Sort locations based on distance from given latitude and longitude
        response.sort((a, b) => {
            const distanceA = calculateDistance(data.latitude, data.longitude, a.latitude, a.longitude);
            const distanceB = calculateDistance(data.latitude, data.longitude, b.latitude, b.longitude);
            return distanceA - distanceB;
        });


        res.status(200).json(response);
    } catch (error) {
        res.json(error)
    }


}
module.exports.getUserMarket = async (req, res) => {
    const { section, user } = req.body
    try {
        let response = await marketModel.find({ user });
        if (response) {
            
            let data = await response.filter(product => product.role === section);
            res.status(200).json(data);
        }
        else{
            res.status(404).json({msg:"user not found"})
        }
    } catch (error) {
        res.status(404).json(error)
    }


}
module.exports.removeMarket = async (req, res) => {
    const marketId = req.params.marketId 
    try {
        let response = await marketModel.deleteOne({ _id:marketId });
        if (response) {
            res.status(200).json({
                msg:"deleted",
                deletedData:response
            });
        }
        else{
            res.status(404).json({msg:"market not found"})
        }
    } catch (error) {
        res.status(404).json(error)
    }


}

module.exports.marketItemDetails = async (req, res) => {
    const itemId = req.body.itemId;
    try {
        const item = await marketModel.findOne({ _id: itemId });
        if (item) {
            res.json(item)
        }
        else {
            res.json({ msg: "item not found" })
        }
    } catch (error) {
        return res.json(error)
    }

}