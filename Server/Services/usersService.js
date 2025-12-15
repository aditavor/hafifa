const LibUser = require("../Models/LibUser");

module.exports = {
  findByUsername: async (username) => {
    return await LibUser.findOne({ where: { username } });
  },

  createUser: async (username, password, isWorker) => {
    return await LibUser.create({ username, password, is_worker: isWorker });
  },
};
