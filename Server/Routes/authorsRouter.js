const express = require("express");
const authorsController = require("../Controllers/authorsController");
const router = express.Router();

// Get all authors
router.get("/", authorsController.getAllAuthors);

// Add author
router.post("/", authorsController.createAuthor);

// Delete author
router.delete("/:authorId", authorsController.deleteAuthor);

module.exports = router;
