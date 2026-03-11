const { UserModel } = require("../src/models/user");
const { validateBody } = require("../src/middleware/validate");

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

// Test UserModel.create
console.log("UserModel.create:");
const user = UserModel.create({ name: "Alice", email: "alice@example.com" });
assert(user.id === 1, "assigns id 1 to first user");
assert(user.name === "Alice", "stores name");
assert(user.email === "alice@example.com", "stores email");
assert(user.createdAt, "adds createdAt timestamp");
assert(user.updatedAt, "adds updatedAt timestamp");

// Test UserModel.findAll
console.log("\nUserModel.findAll:");
const allUsers = UserModel.findAll();
assert(allUsers.length === 1, "returns 1 user");
assert(allUsers[0].name === "Alice", "returns correct user");

// Test UserModel.findById
console.log("\nUserModel.findById:");
const found = UserModel.findById(1);
assert(found !== null, "finds existing user");
assert(found.name === "Alice", "returns correct user");
const notFound = UserModel.findById(999);
assert(notFound === null, "returns null for non-existent user");

// Test UserModel.count
console.log("\nUserModel.count:");
assert(UserModel.count() === 1, "returns correct count");

// Test validateBody middleware
console.log("\nvalidateBody middleware:");
const mockReq = { body: { name: "Test" } };
const mockRes = {
  statusCode: null,
  body: null,
  status(code) { this.statusCode = code; return this; },
  json(data) { this.body = data; },
};
const mockNext = () => { mockRes.statusCode = 200; };
validateBody(["name", "email"])(mockReq, mockRes, mockNext);
assert(mockRes.statusCode === 400, "returns 400 for missing fields");
assert(mockRes.body.missing.includes("email"), "identifies missing email field");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
