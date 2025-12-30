const LibAuthor = require("./LibAuthor");
const LibBook = require("./LibBook");
const LibUser = require("./LibUser");

// Book and author connection
LibAuthor.hasMany(LibBook, {
  foreignKey: "author_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
LibBook.belongsTo(LibAuthor, {
  foreignKey: "author_id",
  as: "author",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// Book and user connection
LibBook.belongsTo(LibUser, {
  foreignKey: "user_id",
  as: "user",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});
LibUser.hasMany(LibBook, {
  foreignKey: "user_id",
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

module.exports = {
  LibAuthor,
  LibBook,
  LibUser,
};
