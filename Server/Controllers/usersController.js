const userService = require("../Services/usersService");

exports.register = async (req, res) => {
  const SECURITY_CODE = "a";
  try {
    const { username, password, email, securityCode } = req.body;

    // Check if the username exists
    const exists = await userService.findByUsername(username);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    console.log("Creating user");

    const newUser = await userService.createUser(
      username,
      password,
      email,
      securityCode === SECURITY_CODE
    );

    console.log("Successfully created user " + username);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        is_worker: newUser.is_worker,
        balance: newUser.balance,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    console.log("Logging in to user " + username);
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Validate password
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    console.log("Successfully logged in to user " + username);

    return res.json({
      message: "Login successful",
      user: { id: user.id, is_worker: user.is_worker, balance: user.balance },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getReaders = async (req, res) => {
  try {
    console.log("Getting users");
    const users = await userService.getReaders();
    console.log("Successfully got " + users.length + " library users");
    return res.json(users || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Getting user " + userId + " balance");
    const balance = await userService.getBalance(userId);
    console.log("Successfully got users balance");
    return res.json(balance);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const { userId, amount } = req.params;
    console.log("Updating user " + userId + " balance");
    const balance = await userService.updateBalance(userId, amount);
    console.log("Successfully updated user " + userId + " balance");

    if (balance) {
      res.status(202).json({
        message: "Balance updated successfully",
        balance: amount,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
