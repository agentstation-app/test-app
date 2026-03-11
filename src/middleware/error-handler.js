// Global error handling middleware
function errorHandler(err, req, res, _next) {
  console.error(`[Error] ${req.method} ${req.path}:`, err.message);

  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}

function notFoundHandler(req, res) {
  res.status(404).json({
    error: "Not found",
    path: req.path,
  });
}

module.exports = { errorHandler, notFoundHandler };
