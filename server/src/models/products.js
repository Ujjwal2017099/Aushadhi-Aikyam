const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price : {
        type:Number,
        required:true
    },
    SellerId: {
        type: String,
        required: true,
    },
    Pin : {
        type : String,
        required:true
    }
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
