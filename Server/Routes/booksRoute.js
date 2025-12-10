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

// Get readers how didnt return a book longer then 2 weeks

module.exports = router;
