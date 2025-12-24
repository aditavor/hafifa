const LibUser = require("../Models/LibUser");
const { Sequelize } = require("sequelize");

exports.findByUsername = async (username) => {
  return await LibUser.findOne({ where: { username } });
};

exports.createUser = async (username, password, email, isWorker) => {
  return await LibUser.create({
    username,
    password,
    email,
    is_worker: isWorker,
  });
};

exports.getReaders = async () => {
  return await LibUser.findAll({
    attributes: [
      "id",
      "username",
      "email",
      [
        Sequelize.literal(`
        EXISTS (
          SELECT 1
          FROM hafifa.lib_books b
          WHERE b.user_id = "LibUser"."id"
            AND b.borrow_date < CURRENT_DATE - INTERVAL '14 days'
        )
      `),
        "isLate",
      ],
    ],
  });
};
