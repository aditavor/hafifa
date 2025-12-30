const LibAuthor = require("../Models/LibAuthor");
const { Sequelize } = require("sequelize");

exports.postAuthor = async (authorData) => {
  const newAuthor = await LibAuthor.create(authorData);
  return {
    success: true,
    data: newAuthor,
  };
};

exports.getAllAuthors = async () => {
  const authors = await LibAuthor.findAll({
    attributes: ["id", "name", "revenue"],
  });

  return authors;
};

exports.addRevenue = async (authorId, amount) => {
  const [, [updatedAuthor]] = await LibAuthor.update(
    {
      revenue: Sequelize.literal("revenue + " + amount),
    },
    { where: { id: authorId }, returning: true }
  );

  return updatedAuthor ?? null;
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
