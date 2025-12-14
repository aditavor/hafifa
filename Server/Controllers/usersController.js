const userService = require("../Services/usersService");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password, is_worker } = req.body;

      // Check if the username exists
      const exists = await userService.findByUsername(username);
      if (exists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const newUser = await userService.createUser(
        username,
        password,
        is_worker
      );

      return res.status(201).json({
        message: "User created successfully",
        user: { id: newUser.id, is_worker: newUser.is_worker },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user
      const user = await userService.findByUsername(username);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Validate password
      if (password !== user.password) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      return res.json({
        message: "Login successful",
        user: { id: user.id, is_worker: user.is_worker },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
