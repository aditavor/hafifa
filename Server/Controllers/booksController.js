const bookService = require("../Services/booksService");

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await bookService.getAllBooks();
      return res.json(books || []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  borrowBook: async (req, res) => {
    try {
      const { userId } = req.body;
      const { bookId } = req.params;
      const rowsUpdated = await bookService.borrowBook(userId, bookId);

      if (rowsUpdated === 0) {
        return res.status(400).json({
          message: "Book is already borrowed",
        });
      } else {
        res.status(202).json({
          message: "Book borrowed successfully",
          bookId,
          userId,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  returnBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const rowsUpdated = await bookService.returnBook(bookId);

      if (rowsUpdated !== 0) {
        return res.status(202).json({
          message: "Book " + bookId + " returned",
        });
      } else {
        res.status(409).json({
          message: "Cant return book with id: " + bookId,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  postBook: async (req, res) => {
    try {
      const { name, price, authorId, pages } = req.body;
      const result = await bookService.postBook({
        name,
        author_id: authorId,
        price,
        pages,
      });

      if (result.success) {
        return res.status(201).json({
          message: "Book created successfully",
          book: result.data,
        });
      }
      return res.status(400).json({
        error: "Failed to create book",
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

  returnTimeoutUsers: async (req, res) => {
    try {
      const users = await bookService.returnTimeoutUsers();
      return res.json(users || []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getMostPopularBooks: async (req, res) => {
    try {
      const users = await bookService.getMostPopularBooks();
      return res.json(users || []);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
