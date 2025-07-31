const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expireAt: { type: Date, required: true }
})


const OtpSenderSystem = mongoose.model('Otp', otpSchema);
module.exports = OtpSenderSystem