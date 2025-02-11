const Book = require('../models/book');

const getBookByAuthor = async (req, res) => {
  try {
    const books = await Book.find(
      {
        author: { $regex: req.params.author, $options: 'i' },
      },
      { title: 1, author: 1, genre: 1, _id: 0 }
    );
    if (!books) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      data: books,
    });
  } catch (error) {
    console.log('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(
      {},
      { title: 1, author: 1, genre: 1, _id: 0 }
    );

    if (books?.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Books fetched successfully',
        data: books,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No books found',
      });
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id, {
      title: 1,
      author: 1,
      genre: 1,
      _id: 0,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      data: book,
    });
  } catch (error) {
    console.log('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const createBook = async (req, res) => {
  try {
    const newBookData = req.body;
    const newBook = await Book.create(newBookData);

    if (newBookData) {
      res.status(201).json({
        success: true,
        data: newBook,
        message: 'Book created successfully',
      });
    }
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBookData = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updatedBookData, {
      new: true,
    });

    if (book) {
      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: book,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const userDeleted = await Book.findByIdAndDelete(req.params.id);
    if (userDeleted) {
      res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: userDeleted,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
  } catch (error) {
    console.log('Error ->', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong! Please try again',
    });
  }
};

module.exports = {
  getBookByAuthor,
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
