const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    mainContainer: {
        type: String,
        required: true,
    },
    container : {
        type : String,
        required : true
    },
    bit: {
        type: Number,
        required: true,
    },
    priceContainer: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    linkBit : {
        type : Number,
        required : true
    },
    linkContainer : {
        type : String,
        required : true
    },
    isAPI : {
        type : Boolean,
        default : false,
        required : true
    },
    API : {
        type : String
    }
});

const Link = new mongoose.model("Link", linkSchema);

module.exports = Link;
