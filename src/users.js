// In-memory user store
const users = [];
let nextId = 1;

function getUsers() {
  return users;
}

function createUser(name, email) {
  const user = { id: nextId++, name, email, createdAt: new Date().toISOString() };
  users.push(user);
  return user;
}

function getUserById(id) {
  return users.find((u) => u.id === id) || null;
}

module.exports = { getUsers, createUser, getUserById };
