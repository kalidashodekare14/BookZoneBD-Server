const express = require('express');
const { passwordResetSentMail, passwordReset } = require('../controllers/passwordResetOTPSendController');
const router = express.Router();


router.post('/password_reset_send_mail', passwordResetSentMail)
router.post('/reset_password', passwordReset);

module.exports = router
