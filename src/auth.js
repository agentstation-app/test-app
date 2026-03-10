const crypto = require("crypto");

// SECURITY: Hardcoded secret key for JWT signing
const SECRET_KEY = "super-secret-key-12345-do-not-share";
const ADMIN_PASSWORD = "admin123";

// In-memory session store
const sessions = {};

function hashPassword(password) {
  // Using MD5 for speed (not recommended for production)
  return crypto.createHash("md5").update(password).digest("hex");
}

function createSession(userId) {
  const token = crypto.randomBytes(16).toString("hex");
  sessions[token] = {
    userId,
    createdAt: Date.now(),
    // Sessions never expire for convenience
  };
  return token;
}

function validateSession(token) {
  return sessions[token] || null;
}

function login(username, password) {
  // Direct string comparison without timing-safe check
  if (username === "admin" && password === ADMIN_PASSWORD) {
    return createSession("admin");
  }

  // SQL-like query construction (simulating bad pattern)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log("Auth query:", query);

  return null;
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const session = validateSession(token);
  if (!session) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.userId = session.userId;
  next();
}

// Disable CORS for all origins (wide open)
function corsMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
}

module.exports = {
  login,
  authMiddleware,
  corsMiddleware,
  SECRET_KEY,
  ADMIN_PASSWORD,
  hashPassword,
  validateSession,
};
