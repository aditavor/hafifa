const LibBook = require("../Models/LibBook");
const { Op, Sequelize } = require("sequelize");

exports.getAllBooks = async (orderBy, sortType) => {
  const allBooks = await LibBook.findAll({
    attributes: [
      "id",
      "name",
      "price",
      "user_id",
      "borrows",
      "pages",
      "author_id",
    ],
    order: [[orderBy || "name", sortType || "ASC"]],
  });

  return allBooks;
};

exports.getUserstimeoutBooks = async (userId) => {
  const books = await LibBook.findAll({
    attributes: ["id", "name", "borrow_date"],
    where: {
      user_id: userId,
      borrow_date: {
        [Op.lt]: Sequelize.literal("CURRENT_DATE - INTERVAL '14 days'"),
      },
    },
  });

  return books;
};

exports.borrowBook = async (userId, bookId) => {
  const [, [updatedBook]] = await LibBook.update(
    {
      user_id: userId,
      borrows: Sequelize.literal("borrows + 1"),
      borrow_date: Sequelize.literal("CURRENT_DATE"),
    },
    { where: { id: bookId, user_id: { [Op.is]: null } }, returning: true }
  );

  return updatedBook ?? null;
};

exports.deleteBook = async (bookId) => {
  const deleted = await LibBook.destroy({
    where: { id: bookId },
  });

  return deleted !== 0;
};

exports.returnBook = async (bookId) => {
  const [, [updatedBook]] = await LibBook.update(
    {
      user_id: null,
      borrow_date: null,
    },
    { where: { id: bookId, user_id: { [Op.not]: null } }, returning: true }
  );

  return updatedBook ?? null;
};

exports.postBook = async (bookData) => {
  const newBook = await LibBook.create(bookData);
  return {
    success: true,
    data: newBook,
  };
};

exports.getMostPopularBooks = async () => {
  const popularBooks = await LibBook.findAll({
    attributes: ["id", "name", "borrows"],
    order: [["borrows", "DESC"]], // Show in descending
    limit: 10,
    where: {
      borrows: { [Op.gt]: 0 },
    },
  });

  return popularBooks;
};

exports.getUserBooks = async (userId) => {
  const books = await LibBook.findAll({
    attributes: ["id", "name", "borrow_date"],
    where: {
      user_id: userId,
    },
  });

  return books;
};
