/**
 * Utility functions for the test app.
 * Added to test AgentStation risk-check GitHub Action.
 */

/**
 * Format a user object for API response.
 * @param {object} user - Raw user object
 * @returns {object} Formatted user
 */
function formatUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt || new Date().toISOString(),
  };
}

/**
 * Validate user input for creation.
 * @param {object} data - Request body
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateUserInput(data) {
  const errors = [];
  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required and must be a string");
  }
  if (!data.email || !data.email.includes("@")) {
    errors.push("Valid email is required");
  }
  return { valid: errors.length === 0, errors };
}

module.exports = { formatUser, validateUserInput };
