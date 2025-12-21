const express = require("express");
const authorsController = require("../Controllers/authorsController");
const router = express.Router();

// Get all authors
router.get("/", authorsController.getAllAuthors);

router.post("/", authorsController.createAuthor);

module.exports = router;
