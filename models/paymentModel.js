const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    currency: { type: String },
}, { timestamps: true });

const paymentData = mongoose.model("OrderInfo", paymentSchema);
module.exports = paymentData;