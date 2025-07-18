const express = require('express');
const { publicTotalBooks, viewDetailsBook } = require('../controllers/publicTotalBookControllers');
const router = express.Router();


router.get('/all_books', publicTotalBooks);
router.get('/view_details/:id', viewDetailsBook)


module.exports = router

