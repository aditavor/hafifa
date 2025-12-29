const LibAuthor = require("../Models/LibAuthor");

exports.postAuthor = async (authorData) => {
  const newAuthor = await LibAuthor.create(authorData);
  return {
    success: true,
    data: newAuthor,
  };
};

exports.getAllAuthors = async () => {
  const authors = await LibAuthor.findAll({
    attributes: ["id", "name"],
  });

  return authors;
};
