const { DataTypes } = require("sequelize");
const sequelize = require("../DBConnection");

const LibUser = sequelize.define(
  "LibUser",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_worker: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "lib_users",
    schema: "hafifa",
    timestamps: false,
  }
);

module.exports = LibUser;
