const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    User: {
        type: String,
        required: true,
    },
    Products: {
        type: [String],
    }
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
