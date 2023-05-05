const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Type: {
        type: Number,
        default : 0
    },
    Address : {
        type:String
    },
    SellerId : {
        type:String
    },
    History : [String],
    Cart : [String],
    Orders : [String]
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
