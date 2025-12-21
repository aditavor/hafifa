const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/booksController");

// Get all books
router.get("/", booksController.getAllBooks);

// Borrow a book
router.put("/:bookId/borrow", booksController.borrowBook);

// Return a book
router.put("/:bookId/return", booksController.returnBook);

// Post a new book
router.post("/", booksController.postBook);

// Get top 10 most popular books
router.get("/bestSellers", booksController.getMostPopularBooks);

module.exports = router;
