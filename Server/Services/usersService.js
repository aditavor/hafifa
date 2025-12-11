const LibUser = require("../Models/LibUser");

module.exports = {
  isUserWorker: async (userId) => {
    const workerState = await LibUser.findByPk(userId, {
      attributes: ["is_worker"],
      raw: true,
    });

    return workerState.is_worker;
  },

  findByUsername: async (username) => {
    return await LibUser.findOne({ where: { username } });
  },

  createUser: async (username, password) => {
    return await LibUser.create({ username, password });
  },
};
