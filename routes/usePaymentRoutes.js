const express = require('express');
const router = express.Router();
const { paymentIntegration } = require('../controllers/paymentController')



router.post('/payment_integration', paymentIntegration)


module.exports = router;