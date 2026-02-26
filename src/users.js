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

function deleteUser(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const deleted = users.splice(index, 1)[0];
  return deleted;
}

function updateUser(id, updates) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  if (updates.name) user.name = updates.name;
  if (updates.email) user.email = updates.email;
  user.updatedAt = new Date().toISOString();
  return user;
}

module.exports = { getUsers, createUser, getUserById, deleteUser, updateUser };
