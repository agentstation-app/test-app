const express = require("express");
const { UserModel } = require("../models/user");
const { validateBody } = require("../middleware/validate");

const router = express.Router();

// List all users
router.get("/", (req, res) => {
  const users = UserModel.findAll();
  res.json({ data: users, count: users.length });
});

// Get user by ID
router.get("/:id", (req, res) => {
  const user = UserModel.findById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ data: user });
});

// Create user
router.post(
  "/",
  validateBody(["name", "email"]),
  (req, res) => {
    const { name, email } = req.body;
    const user = UserModel.create({ name, email });
    res.status(201).json({ data: user });
  }
);

module.exports = router;
