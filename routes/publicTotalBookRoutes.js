const express = require('express');
const { publicTotalBooks, viewDetailsBook, specialDiscountBook, trendingBooks, academicBooks, totalAuthors } = require('../controllers/publicTotalBookControllers');
const router = express.Router();


router.get('/all_books', publicTotalBooks);
router.get('/view_details/:id', viewDetailsBook);
router.get('/special_discount', specialDiscountBook);
router.get('/trending_books', trendingBooks);
router.get('/academic_books', academicBooks);
router.get('/total_authors', totalAuthors)

module.exports = router

