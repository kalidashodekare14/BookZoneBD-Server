const express = require('express');
const router = express.Router();
const { bookAddApi, totalBookapi } = require('../controllers/totalBookControllers')


router.post('/total_book_add', bookAddApi);
router.get('/total_books', totalBookapi);

module.exports = router;