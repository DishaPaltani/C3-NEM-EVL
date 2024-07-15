const { authJwt } = require("../middleware");
const controller = require("../controllers/book.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/books/:bookId/reviews",
    [authJwt.verifyToken],
    controller.getBookReviews
  );

  // Define other book-related routes
};
