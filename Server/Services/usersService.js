const LibUser = require("../Models/LibUser");
const { Sequelize } = require("sequelize");

exports.findByName = async (name) => {
  return await LibUser.findOne({ where: { name } });
};

exports.createUser = async (name, password, email, isWorker) => {
  return await LibUser.create({
    name,
    password,
    email,
    is_worker: isWorker,
  });
};

exports.deleteUser = async (userId) => {
  const deleted = await LibUser.destroy({
    where: { id: userId },
  });

  return deleted !== 0;
};

exports.getReaders = async (orderBy, sortType, page, limit) => {
  const result = await LibUser.findAndCountAll({
    attributes: [
      "id",
      "name",
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
    ...(limit && { limit }),
    ...(limit && { offset: (page - 1) * limit }),
    order: [[orderBy, sortType]],
  });

  return result;
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
