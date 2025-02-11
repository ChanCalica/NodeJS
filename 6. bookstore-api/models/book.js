const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxLength: [50, 'Book title cannot exceed 50 characters'],
  },
  author: {
    type: String,
    trim: true,
    required: [true, 'Author name is required'],
  },
  publicationDate: {
    type: Number,
    required: [true, 'Publication year is required'],
    min: [1000, 'Year must be at least 1000'],
    max: [new Date().getFullYear(), 'Year cannot be in the future'],
  },
  genre: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);
