const express = require('express');
const { otpSendSytem, verifyOtp } = require('../controllers/passwordResetOTPSendController');
const router = express.Router();


router.post('/otp_send', otpSendSytem);
router.get('/otp_verify', verifyOtp)


module.exports = router
