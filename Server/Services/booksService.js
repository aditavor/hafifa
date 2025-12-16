const LibBook = require("../Models/LibBook");
const { Op, Sequelize } = require("sequelize");
const usersService = require("./usersService");
const LibUser = require("../Models/LibUser");

module.exports = {
  getAllBooks: async () => {
    const allBooks = await LibBook.findAll({
      attributes: ["id", "name", "price", "user_id", "borrows", "pages"],
    });

    return allBooks;
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

  postBook: async (bookData) => {
    const newBook = await LibBook.create(bookData);
    return {
      success: true,
      data: newBook,
    };
  },

  returnTimeoutUsers: async () => {
    const users = await LibBook.findAll({
      attributes: ["name", "borrow_date"],
      where: {
        borrow_date: {
          [Op.lt]: Sequelize.literal("CURRENT_DATE - INTERVAL '14 days'"),
        },
      },
      include: [
        {
          model: LibUser,
          as: "user",
          attributes: ["username", "email", "id"],
        },
      ],
    });

    const usersData = users.map((b) => ({
      username: b.user.username,
      email: b.user.email,
      id: b.user.id,
      bookName: b.name,
      borrowDate: b.borrow_date,
    }));

    return usersData;
  },

  getMostPopularBooks: async () => {
    const popularBooks = await LibBook.findAll({
      attributes: ["name", "borrows"],
      order: [["borrows", "DESC"]], // Show in descending
      limit: 10,
    });

    return popularBooks;
  },
};
