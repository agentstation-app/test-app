const express = require("express");
const { getUsers, createUser } = require("./users");

const app = express();
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Get all users
app.get("/api/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Create a user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const user = createUser(name, email);
  res.status(201).json(user);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
