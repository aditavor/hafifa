const authorsService = require("../Services/authorsService");

exports.getAllAuthors = async (req, res) => {
  try {
    console.log("Getting all authors");
    const authors = await authorsService.getAllAuthors();
    console.log("Successfully got " + authors.length + " authors");
    return res.json(authors || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    console.log("Deleting author");
    const deleted = await authorsService.deleteAuthor(authorId);
    if (deleted) {
      console.log("Successfully deleted author: " + authorId);
      res.status(200).json({
        message: "Author " + authorId + " deleted successfully",
      });
    } else {
      console.log("Cant delete an author: " + authorId);
      res.status(400).json({
        message: "Cant delete an author: " + authorId,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Missing data",
      });
    }
    console.log("Creating author");
    const result = await authorsService.postAuthor({
      name,
    });

    if (result.success) {
      console.log("Successfully created author: " + result.data.id);
      return res.status(201).json({
        message: "Author created successfully",
        author: result.data,
      });
    }
    return res.status(400).json({
      error: "Failed to create author",
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "This author already exists",
      });
    }
    res.status(500).json({ error: err.message });
  }
};
