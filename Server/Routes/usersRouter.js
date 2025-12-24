const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/booksController");
const userController = require("../Controllers/usersController");

// Get all readers 
router.get("/", userController.getReaders);

// Register to new account
router.post("/register", userController.register);

// Login to existing account
router.post("/login", userController.login);

// Get users books
router.get("/:userId/books", booksController.getUserBooks);

module.exports = router;
