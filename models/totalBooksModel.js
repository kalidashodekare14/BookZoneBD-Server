const mongoose = require('mongoose');


const booksSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    orders: { type: Number },
    specialDiscount: { type: Boolean },
    type: { type: Boolean }

})


const totalBooks = mongoose.model('total_books', booksSchema);

module.exports = totalBooks