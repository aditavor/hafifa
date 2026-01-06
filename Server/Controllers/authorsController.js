const authorsService = require("../Services/authorsService");

exports.getAllAuthors = async (req, res) => {
  try {
    const { orderBy, sortType, page, limit } = req.query;
    console.log("Getting page authors");
    const result = await authorsService.getAllAuthors(
      orderBy,
      sortType,
      Number(page),
      limit ? Number(limit) : undefined
    );
    console.log("Successfully got " + result.rows.length + " authors");
    return res.json({ rows: result.rows || [], count: result.count });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.addRevenue = async (req, res) => {
  try {
    const { authorId, amount } = req.params;
    console.log("Adding revenue");
    const updatedAuthor = await authorsService.addRevenue(authorId, amount);

    if (!updatedAuthor) {
      console.log(err.message);
      return res.status(400).json({
        message: "Cant add avenue to author " + authorId,
      });
    } else {
      console.log("Successfully added " + amount + " to author " + authorId);
      res.status(202).json({
        message: "Added " + amount + " to author " + authorId,
        author: updatedAuthor,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
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
    console.log(err.message);
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
    console.log("Failed to create author");
    return res.status(400).json({
      error: "Failed to create author",
    });
  } catch (err) {
    console.log(err.message);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "This author already exists",
      });
    }
    res.status(500).json({ error: err.message });
  }
};
