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

exports.deleteAuthor = async (authorId) => {
  console.log(authorId);
  console.log(authorId);
  console.log(authorId);
  console.log(authorId);
  console.log(authorId);
  console.log(authorId);
  const deleted = await LibAuthor.destroy({
    where: { id: authorId },
  });

  return deleted !== 0;
};
