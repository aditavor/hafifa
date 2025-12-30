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
      unique: true,
      allowNull: false,
    },

    revenue: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "lib_authors",
    schema: "hafifa",
    timestamps: false,
  }
);

module.exports = LibAuthor;
