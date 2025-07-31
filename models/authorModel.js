const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema({
    author_name: { type: String, required: true },
    author_image: { type: String },
    author_nationality: { type: String, required: true },
    author_dob: { type: String, required: true },
    author_bio: { type: String, required: true },
}, { timestamps: true })



const authorCollection = mongoose.model("authors", authorSchema);
module.exports = authorCollection;