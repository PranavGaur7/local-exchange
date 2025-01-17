const mongoose = require('mongoose')
const emailValidator = require('email-validator')

mongoose.connect(process.env.MONGO_LINK)
    .then(function (db) {
        console.log("user db connected");
    })
    .catch(function (err) {
        console.log(err);
    })

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "user should unique"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email should unique"],
        validate: {
            validator: function () {
                return emailValidator.validate(this.email);
            },
            message: props => "notValidMail"
        }
    },
    password: {
        type: String,
        required: true
    },
    contacts: {
        type: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            product: { type: String, required: true },
            productName: { type: String, required: true },
            role: { type: String, required: true },
            updatedAt:{type: Date,default: Date.now},
        }],
        default: []
    }
})


module.exports = mongoose.model('userModel', userSchema);