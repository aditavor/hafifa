const LibUser = require("../Models/LibUser");

module.exports = {
  findByUsername: async (username) => {
    return await LibUser.findOne({ where: { username } });
  },

  createUser: async (username, password, email, isWorker) => {
    return await LibUser.create({
      username,
      password,
      email,
      is_worker: isWorker,
    });
  },

  getReaders: async (username, password, email, isWorker) => {
    return await LibUser.findAll({
      attributes: ["username", "email", "is_worker"],
    });
  },
};
