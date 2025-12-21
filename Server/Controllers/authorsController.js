const authorsService = require("../Services/authorsService");

module.exports = {
  getAllAuthors: async (req, res) => {
    try {
      const authors = await authorsService.getAllAuthors();
      return res.json(authors || []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  createAuthor: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          message: "Missing data",
        });
      }
      const result = await authorsService.postAuthor({
        name,
      });

      if (result.success) {
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
          message: "This value already exists",
        });
      }
      res.status(500).json({ error: err.message });
    }
  },
};
