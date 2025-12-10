const LibUser = require("../Models/LibUser");

module.exports = {
  isUserWorker: async (userId) => {
    const workerState = await LibUser.findByPk(userId, {
      attributes: ["is_worker"],
      raw: true,
    });

    return workerState.is_worker;
  },
};
