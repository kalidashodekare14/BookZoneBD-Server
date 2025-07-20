const express = require('express');
const { registerUser, loginUser, googleAuthUser } = require('../controllers/userControllers');
const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google_auth', googleAuthUser);




module.exports = router;


