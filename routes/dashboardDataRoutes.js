const express = require('express');
const router = express.Router();
const { bookAddApi, totalBookapi } = require('../controllers/totalBookControllers')
const { dashboardTotalUsers } = require('../controllers/dashboardTotalUserControllers');
const { dashboardTotalInfo } = require('../controllers/dashboardTotalInfoController');
const { authorDataInsert, totalAuthors, totalAuthorsGet } = require('../controllers/authorContorllers');

router.get('/total_info', dashboardTotalInfo)
router.get('/total_books', totalBookapi);
router.get('/total_user', dashboardTotalUsers)
router.post('/total_book_add', bookAddApi);
router.post('/author_add', authorDataInsert);
router.get('/total_author', totalAuthors)
router.get('/authors_get', totalAuthorsGet)

module.exports = router;