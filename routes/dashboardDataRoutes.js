const express = require('express');
const router = express.Router();
const { bookAddApi, totalBookapi } = require('../controllers/totalBookControllers')
const { dashboardTotalUsers } = require('../controllers/dashboardTotalUserControllers');
const { dashboardTotalInfo } = require('../controllers/dashboardTotalInfoController');


router.get('/total_info', dashboardTotalInfo)
router.get('/total_books', totalBookapi);
router.get('/total_user', dashboardTotalUsers)
router.post('/total_book_add', bookAddApi);

module.exports = router;