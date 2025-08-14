const express = require('express');
const router = express.Router();
const { writerInfo, writerInfoUpdate, writerBookCreate, writerTotalBook, writerBookUpdate } = require('../controllers/writerInfoControllers/writerInfoControllers');



router.get('/writer_info/:email', writerInfo);
router.patch('/writer_info_update/:email', writerInfoUpdate);
router.post('/writer_book_create', writerBookCreate);
router.get('/writer_my_book/:id', writerTotalBook);
router.patch('/writer_book_update/:id', writerBookUpdate);

module.exports = router
