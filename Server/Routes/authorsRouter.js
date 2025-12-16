const express = require("express");
const router = express.Router();
const LibAuthor = require("../Models/LibAuthor");

// Get all authors
router.get("/", async (req, res) => {
  const authors = await LibAuthor.findAll();
  return res.json(authors || []);
});

module.exports = router;
