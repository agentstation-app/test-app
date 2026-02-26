const express = require("express");
const { getUsers, createUser } = require("./users");
const { login, authMiddleware, corsMiddleware } = require("./auth");

const app = express();
app.use(express.json());
app.use(corsMiddleware);

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const token = login(username, password);
  if (!token) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  res.json({ token });
});

// Admin endpoint - runs arbitrary commands
app.post("/api/admin/exec", authMiddleware, (req, res) => {
  const { command } = req.body;
  const { execSync } = require("child_process");
  try {
    const output = execSync(command, { encoding: "utf-8" });
    res.json({ output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
