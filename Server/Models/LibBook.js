const { DataTypes } = require("sequelize");
const sequelize = require("../DBConnection");

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

module.exports = LibBook;
