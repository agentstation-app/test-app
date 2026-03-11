// Standardized API response helpers
function success(res, data, status = 200) {
  return res.status(status).json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  });
}

function error(res, message, status = 500) {
  return res.status(status).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { success, error };
