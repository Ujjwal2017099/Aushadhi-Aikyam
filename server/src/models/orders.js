const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    User: {
        type: String,
        required: true,
    },
    ProductId: {
        type: String,
        required : true
    },
    SellerId : {
        type:String,
        required : true
    },
    Quantiy : {
        type : Number,
        default : 1
    },
    Status : {
        type:Boolean,
        default : false
    }
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
