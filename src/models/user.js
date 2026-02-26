// User model with in-memory store
const store = [];
let nextId = 1;

class UserModel {
  static findAll() {
    return [...store];
  }

  static findById(id) {
    return store.find((u) => u.id === id) || null;
  }

  static create(data) {
    const user = {
      id: nextId++,
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.push(user);
    return user;
  }

  static count() {
    return store.length;
  }
}

module.exports = { UserModel };
