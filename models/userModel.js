const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String},
    description: { type: String },
    date_of_birth: { type: String },
    gender: { type: String },
    mobile_number: { type: Number },
    image: { type: String }

}, { timestamps: true });


const User = mongoose.model('Users', userSchema);
module.exports = User;