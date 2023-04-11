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
    }
});

const Link = new mongoose.model("Link", linkSchema);

module.exports = Link;
