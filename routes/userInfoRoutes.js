const express = require('express');
const router = express.Router();
const { userInfoApi, userInformationUpdate } = require('../controllers/userInfoControllers');




router.get('/profile/:email', userInfoApi);
router.patch('/user_information_update/:email', userInformationUpdate);

module.exports = router