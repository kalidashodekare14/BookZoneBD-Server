const express = require('express');
const router = express.Router();
const { userInfoApi, userInformationUpdate, userNavInfo } = require('../controllers/userInfoControllers');




router.get('/profile/:email', userInfoApi);
router.patch('/user_information_update/:email', userInformationUpdate);
router.get('/nav_info', userNavInfo);

module.exports = router