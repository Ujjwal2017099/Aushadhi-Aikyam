const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Mobile: {
        type: String,
        required: true,
    },
    GST: {
        type : String,
        required:true
    },
    PIN: {
        type: String,
        required:true
    },
    Address : {
        type: String,
        required : true
    },
    Products : {
        type : [String]
    },
    Orders : {
        type : [String]
    }
});

const Seller = new mongoose.model("Seller", sellerSchema);

module.exports = Seller;
