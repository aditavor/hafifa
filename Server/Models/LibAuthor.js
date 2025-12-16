const { DataTypes } = require("sequelize");
const sequelize = require("../DBConnection");

const LibAuthor = sequelize.define(
  "LibAuthor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "lib_authors",
    schema: "hafifa",
    timestamps: false,
  }
);

module.exports = LibAuthor;
