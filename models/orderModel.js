const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tran_id: { type: String },
    customar_name: { type: String },
    customar_email: { type: String },
    amount: { type: Number },
    image: { type: String },
    addressData: {
        type: Object
    },
    products: {
        type: Array
    },
    payment_status: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    order_status: {
        type: String,
        enum: ["Pending", "Processing", "Delivered", "Cancelled"],
        default: "Pending"
    },
    currency: { type: String },
}, { timestamps: true });

const orderData = mongoose.model("OrderInfo", orderSchema);
module.exports = orderData;