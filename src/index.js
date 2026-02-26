const express = require("express");
const { getUsers, createUser, getUserById, deleteUser, updateUser } = require("./users");

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

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// Update a user
app.patch("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = updateUser(parseInt(req.params.id), { name, email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const user = deleteUser(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ message: "User deleted", user });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
