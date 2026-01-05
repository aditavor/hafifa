const userService = require("../Services/usersService");

exports.register = async (req, res) => {
  const SECURITY_CODE = "a";

  try {
    const { name, password, email, securityCode } = req.body;

    // Check if the name exists
    const exists = await userService.findByName(name);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    console.log("Creating user");

    const newUser = await userService.createUser(
      name,
      password,
      email,
      securityCode === SECURITY_CODE
    );

    console.log("Successfully created user " + name);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        is_worker: newUser.is_worker,
        balance: newUser.balance,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find the user
    console.log("Logging in to user " + name);
    const user = await userService.findByName(name);
    if (!user) {
      console.log("Cant create a user");
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Validate password
    if (password !== user.password) {
      console.log("Cant create a user");
      return res.status(400).json({ message: "Invalid username or password" });
    }

    console.log("Successfully logged in to user " + name);

    return res.json({
      message: "Login successful",
      user: { id: user.id, is_worker: user.is_worker, balance: user.balance },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.getReaders = async (req, res) => {
  try {
    const { orderBy, sortType, page, limit } = req.query;

    console.log("Getting users");
    const result = await userService.getReaders(
      orderBy,
      sortType,
      Number(page),
      Number(limit)
    );
    console.log("Successfully got " + result.rows.length + " library users");
    return res.json({ rows: result.rows || [], count: result.count });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Deleting users");
    const deleted = await userService.deleteUser(userId);

    if (deleted) {
      console.log("Successfully deleted user: " + userId);
      res.status(200).json({
        message: "User " + userId + " deleted successfully",
      });
    } else {
      console.log("Cant delete user: " + userId);
      res.status(400).json({
        message: "Cant delete user: " + userId,
      });
    }
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const { userId, amount } = req.params;
    console.log("Updating user " + userId + " balance");
    const balance = await userService.updateBalance(userId, amount);

    if (balance) {
      console.log("Successfully updated user " + userId + " balance");
      res.status(202).json({
        message: "Balance updated successfully",
        balance: amount,
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
