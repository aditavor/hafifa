const LibBook = require("../Models/LibBook");
const { Op, Sequelize } = require("sequelize");
const usersService = require("./usersService");

module.exports = {
  getAllBooks: async () => {
    return await LibBook.findAll({
      attributes: ["id", "name", "price", "user_id"],
    });
  },

  borrowBook: async (userId, bookId) => {
    const [rowsUpdated] = await LibBook.update(
      {
        user_id: userId,
        borrows: Sequelize.literal("borrows + 1"),
        borrow_date: Sequelize.literal("CURRENT_DATE"),
      },
      { where: { id: bookId, user_id: { [Op.is]: null } } }
    );

    return rowsUpdated;
  },

  returnBook: async (bookId) => {
    const [rowsUpdated] = await LibBook.update(
      {
        user_id: null,
        borrow_date: null,
      },
      { where: { id: bookId, user_id: { [Op.not]: null } } }
    );

    return rowsUpdated;
  },
};
