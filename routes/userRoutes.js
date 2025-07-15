const express = require('express');
const { registerUser, loginUser, userInformationUpdate } = require('../controllers/userControllers');
const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);




module.exports = router;


