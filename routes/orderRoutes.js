const express = require('express');
const router = express.Router();
const { paymentIntegration, paymentSucces, paymentFail, paymentCancel, cashOnPayment } = require('../controllers/paymentController')



router.post('/payment_integration', paymentIntegration);
router.post('/payment_success', paymentSucces);
router.post('/payment_fail', paymentFail);
router.post('/payment_cancel', paymentCancel);
router.post('/cash_on_payment', cashOnPayment);


module.exports = router;