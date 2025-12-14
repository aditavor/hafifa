const { DataTypes } = require("sequelize");
const sequelize = require("../DBConnection");

const LibAuthor = require("./LibAuthor");
const LibUser = require("./LibUser");

const LibBook = sequelize.define(
  "LibBook",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "lib_authors",
        key: "id",
      },
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "lib_users",
        key: "id",
      },
    },

    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    borrow_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    borrows: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "lib_books",
    schema: "hafifa",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["name", "author_id"],
      },
    ],
  }
);

// Book and author connection
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

module.exports = LibBook;
