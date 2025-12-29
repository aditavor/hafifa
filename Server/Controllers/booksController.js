const bookService = require("../Services/booksService");

exports.getAllBooks = async (req, res) => {
  try {
    console.log("Getting all book");
    const books = await bookService.getAllBooks();
    console.log("Successfully got " + books.length + " books");
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserstimeoutBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Deleting book");
    const books = await bookService.getUserstimeoutBooks(userId);
    console.log(
      "Successfully got" + books.length + " timeout books for user" + userId
    );
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    console.log("Deleting book");
    const deleted = await bookService.deleteBook(bookId);

    if (deleted) {
      console.log("Successfully deleted book: " + bookId);
      res.status(200).json({
        message: "Book " + bookId + " deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "Cant delete a book: " + bookId,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookId } = req.params;
    console.log("Borrowing book");
    const updatedBook = await bookService.borrowBook(userId, bookId);

    if (!updatedBook) {
      return res.status(400).json({
        message: "Cant borrow book with id: " + bookId,
      });
    } else {
      console.log("Successfully borrowed book: " + bookId);
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
    console.log("Returning book");
    const updatedBook = await bookService.returnBook(bookId);

    if (!updatedBook) {
      return res.status(409).json({
        message: "Cant return book with id: " + bookId,
      });
    } else {
      console.log("Successfully returned book: " + bookId);
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
    console.log("Creating book");
    const result = await bookService.postBook({
      name,
      author_id: authorId,
      price,
      pages,
    });

    if (result.success) {
      console.log("Successfully created book: " + result.data.id);
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
    console.log("Getting most popular books");
    const books = await bookService.getMostPopularBooks();
    console.log("Successfully got " + books.length + " books");
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Getting user's books");
    const books = await bookService.getUserBooks(userId);
    console.log(
      "Successfully got " + books.length + " books for user- " + userId
    );
    return res.json(books || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
