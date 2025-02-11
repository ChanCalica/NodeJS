const express = require('express');
const router = express.Router();
const {
  getBookByAuthor,
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book-controller');

router.get('/get/author/:author', getBookByAuthor);
router.get('/get', getAllBooks);
router.get('/get/:id', getSingleBook);
router.post('/create', createBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;
