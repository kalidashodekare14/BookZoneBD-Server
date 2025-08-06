const express = require('express');
const router = express.Router();
const { userInfoApi, userInformationUpdate, userRoleVerify } = require('../controllers/userInfoControllers');




router.get('/profile/:email', userInfoApi);
router.patch('/user_information_update/:email', userInformationUpdate);
router.get('/user_role', userRoleVerify);

module.exports = router