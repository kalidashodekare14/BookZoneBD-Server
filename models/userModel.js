const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: {
        type: String,
        required: () => {
            return !this.isGoogleUser
        }
    },
    name: { type: String },
    isGoogleUser: { type: Boolean },
    description: { type: String },
    date_of_birth: { type: String },
    gender: { type: String },
    contact_number: { type: String },
    alternative_phone_number: { type: String },
    country: { type: String },
    city: { type: String },
    state: { type: String },
    union: { type: String },
    address: { type: String },
    image: { type: String },
    role: { type: String },
    resetToken: { type: String },
    isActive: { stype: Boolean }

}, { timestamps: true });


const User = mongoose.model('Users', userSchema);
module.exports = User;