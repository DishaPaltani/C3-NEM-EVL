const mongoose = require('mongoose');

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    reviews: [
      {
        userId: String,
        content: String,
        rating: Number
      }
    ]
  })
);

module.exports = Book;
