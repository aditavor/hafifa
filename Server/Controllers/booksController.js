const bookService = require("../Services/booksService");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.params;
    const updatedBook = await bookService.borrowBook(userId, bookId);

    if (!updatedBook) {
      return res.status(400).json({
        message: "Cant borrow book with id: " + bookId,
      });
    } else {
      res.status(202).json({
        message: "Book " + bookId + " borrowed successfully",
        book: updatedBook,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const updatedBook = await bookService.returnBook(bookId);

    if (!updatedBook) {
      return res.status(409).json({
        message: "Cant return book with id: " + bookId,
      });
    } else {
      res.status(202).json({
        message: "Book " + bookId + " returned successfully",
        book: updatedBook,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.postBook = async (req, res) => {
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
        message: "This book already exists",
      });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getMostPopularBooks = async (req, res) => {
  try {
    const books = await bookService.getMostPopularBooks();
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await bookService.getUserBooks(userId);
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
