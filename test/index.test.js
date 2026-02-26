const { getUsers, createUser, getUserById } = require("../src/users");

// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.log(`  ✗ ${message}`);
    failed++;
  }
}

console.log("Running tests...\n");

// Test createUser
console.log("createUser:");
const user = createUser("Alice", "alice@example.com");
assert(user.id === 1, "assigns id 1 to first user");
assert(user.name === "Alice", "stores name");
assert(user.email === "alice@example.com", "stores email");
assert(user.createdAt, "adds createdAt timestamp");

// Test getUsers
console.log("\ngetUsers:");
const allUsers = getUsers();
assert(allUsers.length === 1, "returns 1 user");
assert(allUsers[0].name === "Alice", "returns correct user");

// Test getUserById
console.log("\ngetUserById:");
const found = getUserById(1);
assert(found !== null, "finds existing user");
assert(found.name === "Alice", "returns correct user");
const notFound = getUserById(999);
assert(notFound === null, "returns null for non-existent user");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
