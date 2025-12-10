const bookService = require("../Services/booksService");

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await bookService.getAllBooks();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      const { name, price, authorId, userId } = req.body;
      const result = await bookService.postBook(
        {
          name,
          author_id: authorId,
          price,
        },
        userId
      );

      console.log(result);

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
      res.status(500).json({ error: err.message });
    }
  },
};
