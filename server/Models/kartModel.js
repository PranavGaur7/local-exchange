const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_LINK)
    .then(function (db) {
        console.log("kart db connected");
    })
    .catch(function (err) {
        console.log(err);
    })

const kartSchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    kartDetails: {
        type:Array,
        default:[]
    }
}, { timestamps: true })


module.exports = mongoose.model('kartModel', kartSchema);