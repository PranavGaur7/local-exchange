const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_LINK)
.then(function(db) {
    console.log("market db connected");
})
.catch(function(err) {
    console.log(err);
})

const marketSchema = mongoose.Schema({
    product:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['Trader','Seller']
    }
    ,
    category:{
        type:String,
        required:true,
        enum:[
            "Electronics",
            "Clothing & Apparel",
            "Home & Kitchen Appliances",
            "Beauty & Personal Care",
            "Health & Wellness",
            "Sports & Outdoors",
            "Toys & Games",
            "Books & Media",
            "Automotive & Tools",
            "Furniture & Home Decor",
            "Food & Beverages",
            "Office Supplies",
            "Pet Supplies",
            "Baby & Kids",
            "Jewelry & Accessories",
            "Groceries",
            "Fitness & Exercise Equipment",
            "Arts & Crafts",
            "Gardening & Outdoor Living",
            "Travel & Luggage"
        ]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',  
        required:[true,'product must belong to a user']
    },
    productImages:{
        type:Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:Array,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model('marketModel',marketSchema);