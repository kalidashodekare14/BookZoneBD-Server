const mongoose = require('mongoose');


const booksSchema = new mongoose.Schema({
    book_title: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    stock: { type: Number, required: true },
    book_image: { type: String, required: true },
})


const totalBooks = mongoose.model('total_books', booksSchema);

module.exports = totalBooks