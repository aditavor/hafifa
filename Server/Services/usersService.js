const LibUser = require("../Models/LibUser");

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
    attributes: ["id", "username", "email", "is_worker"],
  });
};
