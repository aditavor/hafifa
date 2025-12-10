const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/booksController");

// Get readers how didnt return a book longer then 2 weeks
router.get("/returnTimeout", booksController.returnTimeoutUsers);

module.exports = router;
