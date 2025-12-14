const express = require("express");
const app = express();
const sequelize = require("./DBConnection");
const cors = require("cors");

// Load models
require("./Models/LibUser");
require("./Models/LibAuthor");
require("./Models/LibBook");

// Midllewares
app.use(cors());
app.use(express.json());

// Check connection
sequelize
  .authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Error:", err));

// Routes
app.use("/books", require("./Routes/booksRoute"));
app.use("/users", require("./Routes/usersRouter"));
app.use("/authors", require("./Routes/authorsRouter"));

async function startServer() {
  await sequelize.sync();
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

startServer();
