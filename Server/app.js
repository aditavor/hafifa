const express = require("express");
const app = express();
const sequelize = require("./DBConnection");

// Load models
require("./Models/LibUser");
require("./Models/LibAuthor");
require("./Models/LibBook");

app.use(express.json());

// Check connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Error:", err));

// Sync models
sequelize
  .sync({ alter: false })
  .then(() => console.log("Models synced"))
  .catch((err) => console.error("Sync Error:", err));

// Routes
app.use("/books", require("./Routes/booksRoute"));
app.use("/users", require("./Routes/usersRouter"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
