const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/booksController");
const userController = require("../Controllers/usersController");

// Get readers how didnt return a book longer then 2 weeks
router.get("/returnTimeout", booksController.returnTimeoutUsers);

// Get all readers 
router.get("/", userController.getReaders);

// Register to new account
router.post("/register", userController.register);

// Login to existing account
router.post("/login", userController.login);

module.exports = router;
