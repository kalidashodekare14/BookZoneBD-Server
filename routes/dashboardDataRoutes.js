const express = require('express');
const router = express.Router();
const { bookAddApi, totalBookapi, bookDataUpdate, bookDataDelete } = require('../controllers/totalBookControllers')
const { dashboardTotalUsers, dashboardUserRole } = require('../controllers/dashboardTotalUserControllers');
const { dashboardTotalInfo } = require('../controllers/dashboardTotalInfoController');
const { publisherDataInsert, totalPublishers, publisherUpdate, publisherDelete, totalAuthorsGet } = require('../controllers/authorContorllers');
const { orderManage, orderStatus, orderDetails } = require('../controllers/orderManageControllers')
const { orderReceiptApi } = require('../controllers/orderReceiptController');
const { totalReviews } = require('../controllers/totalReviewControllers')


router.get('/total_info', dashboardTotalInfo);
router.get('/total_books', totalBookapi);
router.patch('/book_update/:id', bookDataUpdate);
router.delete('/book_delete/:id', bookDataDelete);
router.get('/total_user', dashboardTotalUsers);
router.patch('/user_role/:id', dashboardUserRole);
router.post('/total_book_add', bookAddApi);
router.post('/publiser_add', publisherDataInsert);
router.get('/total_publisher', totalPublishers);
router.patch('/publisher_info_update/:id', publisherUpdate);
router.delete('/publisher_delete/:id', publisherDelete);
// Add Book Author dropdown api set 👇 (/authors_get)
router.get('/authors_get', totalAuthorsGet);
router.get('/order_manage', orderManage);
router.patch('/order_status/:id', orderStatus);
router.get('/order_details/:id', orderDetails);
router.get('/order_receipt/:id', orderReceiptApi);
router.get('/total_review', totalReviews);


module.exports = router;