const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_image: { type: String, required: true },
    product_id: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, { timestamps: true })

const reviewProdct = mongoose.model("reviews", reviewSchema);
module.exports = reviewProdct;