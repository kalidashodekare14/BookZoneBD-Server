const express = require('express');
const { publicTotalBooks, viewDetailsBook, specialDiscountBook, trendingBooks, academicBooks, totalWriters, writerDetails } = require('../controllers/publicTotalBookControllers');
const { prodcutReview, productTotalReview } = require('../controllers/productReviewControllers')
const router = express.Router();


router.get('/all_books', publicTotalBooks);
router.get('/view_details/:id', viewDetailsBook);
router.post('/product_review', prodcutReview);
router.get('/total_review/:id', productTotalReview);
router.get('/special_discount', specialDiscountBook);
router.get('/trending_books', trendingBooks);
router.get('/academic_books', academicBooks);
router.get('/total_authors', totalWriters);
router.get('/view_writer/:id', writerDetails)


module.exports = router

