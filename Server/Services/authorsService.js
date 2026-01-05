const LibAuthor = require("../Models/LibAuthor");
const { Sequelize } = require("sequelize");

exports.postAuthor = async (authorData) => {
  const newAuthor = await LibAuthor.create(authorData);
  return {
    success: true,
    data: newAuthor,
  };
};

exports.getAllAuthors = async (orderBy, sortType, page, limit) => {
  const offset = (page - 1) * limit;
  const result = await LibAuthor.findAndCountAll({
    attributes: ["id", "name", "revenue"],
    limit,
    offset,
    order: [[orderBy || "name", sortType || "ASC"]],
  });

  return result;
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
  const deleted = await LibAuthor.destroy({
    where: { id: authorId },
  });

  return deleted !== 0;
};
