const mongoose = require('mongoose');


const publisherSchema = new mongoose.Schema({
    publisher_name: { type: String, required: true },
    publisher_website: { type: String, required: true },
    publisher_image: { type: String, required: true },
    publisher_description: { type: String, required: true },
}, { timestamps: true })



const publisherCollection = mongoose.model("publishers", publisherSchema);
module.exports = publisherCollection;