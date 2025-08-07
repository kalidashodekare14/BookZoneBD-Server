const express = require('express');
const router = express.Router();
const { userInfoApi, userInformationUpdate, userRoleVerify, userOrderInfo } = require('../controllers/userInfoControllers');




router.get('/profile/:email', userInfoApi);
router.patch('/user_information_update/:email', userInformationUpdate);
router.get('/user_role', userRoleVerify);
router.get('/user_order/:email', userOrderInfo);

module.exports = router;