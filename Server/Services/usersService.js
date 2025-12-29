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
      "balance",
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

exports.getBalance = async (userId) => {
  return await LibUser.findByPk(userId, {
    attributes: ["balance"],
  });
};

exports.updateBalance = async (userId, amount) => {
  const balance = await LibUser.update(
    { balance: amount },
    { where: { id: userId } }
  );

  return balance;
};
