const db = require("../models");
const Book = db.book;

exports.getBookReviews = (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      if (!book) {
        return res.status(404).send({ message: "Book Not found." });
      }
      res.status(200).send(book.reviews);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Implement other book-related operations
