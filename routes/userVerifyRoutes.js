const express = require('express');
const router = express.Router();
const { adminVarify } = require('../controllers/userVerifyControllers');


router.get('/isAdmin/:email', adminVarify);


module.exports = router;