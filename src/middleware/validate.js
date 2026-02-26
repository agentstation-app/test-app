// Request body validation middleware
function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter((f) => !req.body[f]);
    if (missing.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        missing: missing,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }
    next();
  };
}

module.exports = { validateBody };
